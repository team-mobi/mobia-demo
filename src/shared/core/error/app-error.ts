import { Data } from "effect";

export class BadClientRequest extends Data.TaggedError("BadRequest") {
  constructor(public message: string) {
    super();
  }
}
export class ValidateError extends Data.TaggedError("ValidateError") {
  constructor(public message: string) {
    super();
  }
}
export class RangeError extends Data.TaggedError("RangeError") {
  constructor(public message: string) {
    super();
  }
}

export type AppError = BadClientRequest | ValidateError | RangeError;
