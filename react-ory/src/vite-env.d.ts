/// <reference types="vite/client" />
interface ImportMetaEnv {

  // ╭─────────────────────────────────────────────────────────╮
  // │ website                                                 │
  // ╰─────────────────────────────────────────────────────────╯
  // readonly VITE_APP_TITLE: string
  // readonly VITE_DEFAULT_PROJECT_OWNER_ID: string
  // readonly VITE_IIPM_WEB_DOMAIN: string

  // ╭─────────────────────────────────────────────────────────╮
  // │ google map                                              │
  // ╰─────────────────────────────────────────────────────────╯
  // readonly VITE_IIPM_GOOGLE_MAP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}// <reference types="vite/client" />
