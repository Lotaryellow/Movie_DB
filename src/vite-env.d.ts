/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_APP_APIKEY: string;
  readonly VITE_APP_APIPATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
