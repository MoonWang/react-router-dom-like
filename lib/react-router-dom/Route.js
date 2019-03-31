import React, { Component } from 'react';
import ThemeContext from './context';

export default class Route extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this);
    }

    render() {
        let { path, component: Component } = this.props;
        return (
            <ThemeContext.Consumer>
                {
                    context => {
                        let {location: {pathname}} = context;
                        if(pathname == path || pathname.startsWith(path)) {
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