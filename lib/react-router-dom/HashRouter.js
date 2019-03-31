import React, { Component } from 'react';
import ThemeContext from './context';

export default class HashRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: {
                push: this.push.bind(this)
            },
            location: {
                pathname: window.location.hash.slice(1) || '/'
            }
        };
    }

    componentDidMount() {
        // 自动添加 localhost:8080 -> localhost:8080/#/
        window.location.hash = window.location.hash || '/';
    }

    push(path) {
        window.location.hash = path;
        this.setState({
            location: Object.assign({}, this.state.location, {
                pathname: path
            })
        });
    }
    
    // 不处理任何 UI ，直接渲染子组件
    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}