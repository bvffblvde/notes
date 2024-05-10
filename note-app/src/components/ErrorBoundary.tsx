import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Помилка у компоненті:', error, errorInfo);
        // Можна додати логіку для обробки помилок тут
    }

    render() {
        if (this.state.hasError) {
            return <h2>Виникла помилка при відображенні цього компонента.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
