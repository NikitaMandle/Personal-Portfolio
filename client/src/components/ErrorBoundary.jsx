import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI crash captured by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '32px' }}>
          <div style={{
            width: 'min(560px, 100%)',
            border: '1px solid rgba(255,255,255,0.09)',
            background: 'var(--bg3)',
            padding: '28px',
            textAlign: 'center',
          }}>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '12px' }}>Something broke</h1>
            <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: '18px' }}>
              A component crashed unexpectedly. Please refresh the page.
            </p>
            <button className="btn btn-p" onClick={this.handleReload}>
              Reload Page
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
