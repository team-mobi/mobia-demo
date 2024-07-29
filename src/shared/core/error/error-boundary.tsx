import React, { Component, ErrorInfo, ReactNode } from "react";
import { AppError } from "./app-error";
import { ServerError } from "./server-error";

interface ErrorBoundaryProps {
  fallback: React.ComponentType<{
    error?: AppError | ServerError;
    resetErrorBoundary: () => void;
  }>;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: AppError | ServerError;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(
    error: AppError | ServerError
  ): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: FallbackComponent } = this.props;
      return (
        <FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
