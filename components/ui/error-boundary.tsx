"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught unhandled client exception:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-8 my-6 rounded-2xl bg-neutral-900/90 border border-saffron/20 text-center text-foreground max-w-lg mx-auto">
          <h3 className="text-xl font-bold font-heading mb-2 text-saffron">
            Something went wrong
          </h3>
          <p className="text-xs text-slate-grey mb-4">
            An unexpected visual component error occurred. Please refresh or try again.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-saffron text-white rounded-full hover:bg-saffron/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
