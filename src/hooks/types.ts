// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];
