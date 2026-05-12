/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PMASEV_SHEETS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
