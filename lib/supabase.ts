// Este archivo crea la conexión con Supabase
// Es como el puente entre tu código y la base de datos
// Lo importamos en cualquier archivo que necesite hablar con Supabase

import { createClient } from '@supabase/supabase-js'

// Leemos las variables de entorno que pusiste en .env.local
// El "!" al final le dice a TypeScript "confía en mí, esto existe"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Creamos y exportamos el cliente — una sola instancia para todo el proyecto
// Es como crear una sola conexión al banco en vez de una nueva cada vez
export const supabase = createClient(supabaseUrl, supabaseAnonKey)