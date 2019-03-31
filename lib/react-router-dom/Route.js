import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import ThemeContext from './context';

export default class Route extends Component {
    constructor(props) {
        super(props);
        let { path } = props;
        this.keys = [];
        this.regexp = pathToRegexp(path, this.keys, { end: false }); // 只匹配前缀
        this.keys = this.keys.map(key => key.name); // 只需要缓存 name
    }

    componentDidMount() {
        // console.log(this);
    }

    render() {
        let { path, component: Component } = this.props;
        let { keys } = this;
        return (
            <ThemeContext.Consumer>
                {
                    context => {
                        let {location: {pathname}} = context;
                        // 匹配路由，获取 params 
                        let rst = pathname.match(this.regexp);
                        
                        if(rst) {
                            let [url, ...values] = rst;
                            let params = keys.reduce((memo, key, index) => {
                                memo[key] = values[index];
                                return memo;
                            }, {});
                            
                            context.match = {
                                url,
                                path,
                                params
                            };

                            return <Component {...context} />;
                        } else {
                            return null;
                        }
                    }
                }
            </ThemeContext.Consumer>
        )
    }
}