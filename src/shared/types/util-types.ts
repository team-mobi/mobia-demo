/* eslint-disable @typescript-eslint/no-explicit-any */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type AnyFunction = (...args: any[]) => any;
