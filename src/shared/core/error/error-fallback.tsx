import React from "react";
import { AppError } from "./app-error";
import { ServerError } from "./server-error";
import { BadRequestFallback, NetWorKErrorFallback } from "~widgets/error";

interface ErrorFallbackProps {
  error?: AppError | ServerError;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  if (error?._tag === "NetworkError") {
    return <NetWorKErrorFallback resetErrorBoundary={resetErrorBoundary} />;
  }
  if (error?._tag === "BadRequest") {
    return <BadRequestFallback />;
  }
  throw error;
};
export default ErrorFallback;
