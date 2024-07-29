import { Data } from "effect";

export class NetworkError extends Data.TaggedError("NetworkError") {}
export class BadRequest extends Data.TaggedError("BadRequest") {}

export type ServerError = NetworkError | BadRequest;
