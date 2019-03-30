import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            error: ''
        };
    }

    // 1. 可以配合 render 来渲染一个回退 UI （即出错时的渲染内容）v16.6 新增的
    static getDerivedStateFromError(error) {
        return { 
            hasError: true,
            error: error.toString()
        };
    }
    // 2. 可以记录报错信息，进行日志上报（是在出错后）
    componentDidCatch(error, info) {
        // console.log(error);
        // console.table(info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.error}</h1>;
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;