import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { HashRouter, Route, Link, Switch } from 'lib/react-router-dom';

import ErrorBoundary from './ErrorBoundary';

import './index.less';

let Home = (props, context) => {
    console.log('render');
    console.log(props);
    return <div>首页</div>
}
let User = () => {
    return (
        <>
            <div>用户管理</div>
            <ul>
                <li><Link to="/user/add">user-add</Link></li>
                <li><Link to="/user/del">user-del</Link></li>
                <li><Link to="/user/list">user-list</Link></li>
                <li><Link to="/user/detail/1">user-detail</Link></li>
            </ul>
            <Route path="/user/add" component={UserAdd}/>
            <Route path="/user/del" component={UserDel}/>
            <Route path="/user/list" component={UserList}/>
            <Route path="/user/detail/:id" component={UserDetail}/>
        </>
    )
}
let UserAdd = () => <div>用户添加</div>
let UserDel = () => <div>用户删除</div>
let UserList = () => <div>用户列表</div>
let UserDetail = (props) => <div>用户详情:{props.match.params.id}</div>

let Profile = () => <div>个人设置</div>

ReactDOM.render((
    <ErrorBoundary>
        <HashRouter>
            <ul>
                <li><Link to="/home">home</Link></li>
                <li><Link to="/user">user</Link></li>
                <li><Link to="/profile">profile</Link></li>
            </ul>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/user" component={User}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        </HashRouter>
    </ErrorBoundary>
), document.getElementById('app'));