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
                        if(context.location.pathname == path) {
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