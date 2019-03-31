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
        let { path, component: Component, render } = this.props;
        return (
            <ThemeContext.Consumer>
                {
                    context => {
                        let keys = [];
                        // 使用 switch 时，要动态创建 regexp
                        let regexp = pathToRegexp(path, keys, { end: false }); // 只匹配前缀

                        let {location: { pathname }} = context;
                        // 匹配路由，获取 params 
                        let rst = pathname.match(regexp);
                        
                        if(rst) {
                            // 匹配成功的时候才更新 keys
                            keys = keys.map(key => key.name);

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

                            if(Component) {
                                return <Component {...context} />;
                            } else if(render) {
                                return render(context);
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    }
                }
            </ThemeContext.Consumer>
        )
    }
}