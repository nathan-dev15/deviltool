// @ts-nocheck
import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
};

type State = {
  error?: Error;
  componentStack?: string;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Keep a copy of the component stack for debugging.
    this.setState({ componentStack: info.componentStack });
    // eslint-disable-next-line no-console
    console.error("[Koobrain ErrorBoundary]", this.props.label ?? "app", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-outline-variant/30 bg-surface-container p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Something went wrong
          </h1>
          <p className="mt-3 text-on-surface-variant">
            Error: <span className="font-mono">{this.state.error.message}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-2xl bg-primary px-5 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={() => this.setState({ error: undefined, componentStack: undefined })}
              className="rounded-2xl border border-outline-variant/35 bg-surface-container-low px-5 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors"
            >
              Try Again
            </button>
          </div>

          {this.state.componentStack && (
            <pre className="mt-8 whitespace-pre-wrap rounded-2xl border border-outline-variant/25 bg-surface-container-low p-4 text-xs text-on-surface-variant overflow-auto">
              {this.state.componentStack}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
