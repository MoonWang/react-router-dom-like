import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import ThemeContext from './context';

export default class Switch extends Component {
    constructor() {
        super();
    }

    render() {
        let children = this.props.children;

        return (
            <ThemeContext.Consumer>
                {
                    context => {
                        let {location: { pathname }} = context;
                        for(let i = 0; i < children.length; i++) {
                            let child = children[i];
                            let { path } = child.props;
                            if(pathToRegexp(path, [], {end: false}).test(pathname)) {
                                return child ;
                            }
                        }
                        return null;
                    }
                }
            </ThemeContext.Consumer>
        )
    }
}