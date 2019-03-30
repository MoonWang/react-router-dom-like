import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter, Route, Link } from 'react-router-dom';
import { HashRouter, Route } from 'lib/react-router-dom';

import ErrorBoundary from './ErrorBoundary';

import './index.less';

let Home = (props, context) => {
    console.log(props);
    console.log(context);
    return <div>首页</div>
}
let User = () => <div>用户管理</div>
let Profile = () => <div>个人设置</div>

ReactDOM.render((
    <ErrorBoundary>
        <HashRouter>
            {/* <ul>
                <li><Link to="/home">home</Link></li>
                <li><Link to="/user">user</Link></li>
                <li><Link to="/profile">profile</Link></li>
            </ul> */}
            <Route path="/home" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/profile" component={Profile}/>
        </HashRouter>
    </ErrorBoundary>
), document.getElementById('app'));