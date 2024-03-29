export type SomeOptional<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
