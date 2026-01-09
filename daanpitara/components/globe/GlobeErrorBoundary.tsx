"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ✅ NEW: Error boundary for graceful Three.js failures
 * Place this in: components/globe/GlobeErrorBoundary.tsx
 */
export class GlobeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("Globe render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-center text-gray-600 px-4">
            <p className="text-lg font-semibold mb-2">
              Unable to load 3D globe
            </p>
            <p className="text-sm">
              Please refresh the page or check your browser compatibility
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}