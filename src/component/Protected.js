import React, { Component } from 'react';
import { Route, Redirect } from 'lib/react-router-dom';

export default class Protected extends Component {
    constructor() {
        super();
    }

    render() {
        let { component: Component, ...other} = this.props;
        // render 方法的参数是 context
        return <Route {...other} render={ props => (
            localStorage.getItem('login') ? 
                <Component {...props} /> :
                <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}} />
        )}/>
    }
}