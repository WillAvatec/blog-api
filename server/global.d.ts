declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGODB_URI: string;
    SESSION_PASS: string;
  }
}
