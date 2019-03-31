import React from 'react';
import { Route, Redirect } from 'lib/react-router-dom';

export default ({ component: Component, ...other}) => {
    return <Route {...other} render={ props => (
        localStorage.getItem('login') ? 
            <Component {...props} /> :
            <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}} />
    )}/>
}
