// URL canónica del sitio en producción.
// Se puede sobreescribir con NEXT_PUBLIC_SITE_URL en Vercel si algún día
// cambia el dominio; si no, usa roundiq.app por defecto.
// Sin barra final, para poder concatenar rutas sin duplicar "/".
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://roundiq.app";
