import React, { Component } from 'react';
import ThemeContext from './context';

export default class Link extends Component {
    constructor() {
        super();
    }

    render() {
        let { to } = this.props
        return (
            <ThemeContext.Consumer>
                {
                    ({history: { push }}) => {
                        return <a onClick={() => push(to)}>{this.props.children}</a>
                    }
                }
            </ThemeContext.Consumer>
        )
    }
}