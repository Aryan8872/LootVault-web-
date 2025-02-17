import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error in component:', error, info);
  }

  render() {
    return this.state.hasError ? (
      <div className="error-boundary">
        <h1>Something went wrong</h1>
        <p>Click here to refresh or try again later</p>
        <button onClick={window.location.reload}>Reload</button>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;