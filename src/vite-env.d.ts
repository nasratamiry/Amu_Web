/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full JSON base (`.../api`) or `/api` for Vite proxy. */
  readonly VITE_API_BASE_URL?: string
  /** Django origin only (no `/api`), default `https://api.etihadamu.com`. Drives `API_BASE` and Vite proxy target. */
  readonly VITE_DJANGO_ORIGIN?: string
  /** Public site URL for canonical / Open Graph (`https://etihadamu.com`). Omit in dev → use `window.location.origin`. */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
