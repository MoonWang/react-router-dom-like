import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import ThemeContext from './context';

export default class Route extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this);
    }

    render() {
        let { path, component: Component, render, children } = this.props;
        return (
            <ThemeContext.Consumer>
                {
                    context => {
                        let keys = [];
                        // 使用 switch 时，要动态创建 regexp
                        let regexp = pathToRegexp(path, keys, { end: false }); // 只匹配前缀

                        let {location, history} = context;
                        // 匹配路由，获取 params 
                        let rst = location.pathname.match(regexp);

                        // 防止 match 串到其他 Route 上，且 props 并不全等于 context
                        let props = {
                            location,
                            history
                        };
                        
                        if(rst) {
                            // 匹配成功的时候才更新 keys
                            keys = keys.map(key => key.name);

                            let [url, ...values] = rst;
                            let params = keys.reduce((memo, key, index) => {
                                memo[key] = values[index];
                                return memo;
                            }, {});
                            
                            props.match = {
                                url,
                                path,
                                params
                            };

                            if(Component) {
                                return <Component {...props} />;
                            } else if(render) {
                                return render(props);
                            } else if(children) {
                                return children(props);
                            } else {
                                return null;
                            }
                        } else {
                            if(children) {
                                return children(props);
                            } else {
                                return null;
                            }
                        }
                    }
                }
            </ThemeContext.Consumer>
        )
    }
}