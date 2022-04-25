import React from "react";
import "./styles.css";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service

    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="centerAlign">
          <h1>
            Error Boundaries : Something went wrong. Please try again
            <h5>Todo: Make UI later and accordingly</h5>
          </h1>
          ;
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
