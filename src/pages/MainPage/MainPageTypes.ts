export interface Service {
  name: string;
  swagger: string;
  version?: string | null;
  ip?: string | null;
}
