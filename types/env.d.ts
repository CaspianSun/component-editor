/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_APP_WS_URL: string
  VITE_SOCKET_MAX_RECONNECT_ATTEMPTS: number
  VITE_OSS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
