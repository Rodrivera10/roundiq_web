import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Corre en Node.js (no Edge): necesitamos la service_role key del servidor.
export const runtime = 'nodejs'

// ── Valores permitidos ──
// Solo aceptamos exactamente lo que ofrece el formulario. Cualquier otra cosa
// se rechaza: evita que alguien inyecte datos basura o payloads en la tabla.
const DEPORTES_VALIDOS = new Set(['MMA', 'Boxeo', 'Otro'])
const ROLES_VALIDOS = new Set(['Atleta', 'Entrenador'])
const EMAIL_MAX = 254 // máximo real de un email según RFC 5321
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Rate limiting best-effort en memoria ──
// Frena ráfagas de spam desde una misma IP. Nota: en serverless (Vercel) la
// memoria es por instancia, no global — para protección estricta migrar a
// Upstash/Redis. Aun así corta el abuso básico sin sumar dependencias.
const VENTANA_MS = 60_000
const MAX_POR_VENTANA = 5
const accesos = new Map<string, { count: number; resetAt: number }>()

function limitado(ip: string): boolean {
  const ahora = Date.now()
  const registro = accesos.get(ip)
  if (!registro || ahora > registro.resetAt) {
    accesos.set(ip, { count: 1, resetAt: ahora + VENTANA_MS })
    return false
  }
  registro.count++
  return registro.count > MAX_POR_VENTANA
}

// Limpieza periódica para que el Map no crezca sin límite.
function limpiar() {
  const ahora = Date.now()
  for (const [ip, r] of accesos) if (ahora > r.resetAt) accesos.delete(ip)
}

export async function POST(request: NextRequest) {
  try {
    // IP del cliente (Vercel setea x-forwarded-for)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'desconocida'

    if (limitado(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera un momento.' },
        { status: 429 }
      )
    }
    if (accesos.size > 5000) limpiar()

    // Parseo defensivo del body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 })
    }
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 })
    }

    const { email, deporte, rol } = body as Record<string, unknown>

    // Todos los campos deben ser strings — así `email.toLowerCase()` nunca revienta
    if (
      typeof email !== 'string' ||
      typeof deporte !== 'string' ||
      typeof rol !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const emailNorm = email.toLowerCase().trim()

    // Validación de email: formato + longitud
    if (
      emailNorm.length === 0 ||
      emailNorm.length > EMAIL_MAX ||
      !EMAIL_REGEX.test(emailNorm)
    ) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // deporte y rol deben ser exactamente uno de los permitidos
    if (!DEPORTES_VALIDOS.has(deporte) || !ROLES_VALIDOS.has(rol)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    // La service_role key NUNCA va al frontend — solo aquí, en el servidor
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // ¿Ya existe este email?
    const { data: existente } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', emailNorm)
      .maybeSingle()

    if (existente) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }

    // Contar para asignar posición
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    const posicion = (count || 0) + 1

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: emailNorm, deporte, rol, posicion }])
      .select('posicion')
      .single()

    if (error) {
      // Si el email coló por una carrera, Supabase devuelve violación de unicidad
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Este email ya está registrado' },
          { status: 409 }
        )
      }
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
    }

    return NextResponse.json({ success: true, posicion: data.posicion })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Solo POST está permitido: cualquier otro método devuelve 405.
export async function GET() {
  return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}
