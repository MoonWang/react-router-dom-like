# 简单实现 react-router-dom 

## 安装依赖

> 实际项目中建议用 create-react-app 脚手架搭建项目，学习期间建议手撸。

```bash
$ npm i webpack webpack-cli webpack-dev-server html-webpack-plugin less less-loader css-loader style-loader babel-loader @babel/core @babel/preset-env @babel/preset-react -D
$ npm i react react-dom react-router-dom -S
```

Package | 说明
-- | --
react-router | 核心库
react-router-dom | 浏览器使用
react-router-native | React Native 使用

## 基础说明

- router 
    - 路由容器组件（现在不限制一个根元素了）
    - 有两种模式可选
        - BrowserRouter ：浏览器自带的 H5 API ，restful风格，需要后台配合
        - HashRouter ：使用 hash 方式进行路由，路径后均有 # 
- route 
    - 单条路由规则，存在多个
        - <Route path="/" component={Home}>
    - 渲染时给组件传入 props 如下：
        <img src="./images/react-router-props.png">
- 渲染过程
    - 渲染时会先取当前路径(HashRouter 时为 location.hash)，然后跟 path 匹配
    - 匹配的上就显示 component 指定的组件，不能匹配就不显示

## 开始实现

思路： HashRouter 不处理 UI 显示，只负责提供一些变量(如，当前路径)给 Route ，由 Route 进行路径匹配来决定是否渲染指定 component UI 组件。

过程：按照上面的 props 截图，逐个实现。

贴士：node_modules 中的包是编译后的 ES5 语法，所以可以通过查看[react-router ESM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router/modules)、[react-router-dom ESM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom/modules) 比对学习。

### 1. 使用 context 传递数据及基础渲染

思路：需要的 props 参数并未显式传递，所以通过 context 上下文进行传递。 Router 作为提供者， Route 作为消费者。

```javascript
// context.js
export default React.createContext({});
```

```javascript
// HashRouter.js
render() {
    return (
        <ThemeContext.Provider value={{location: {pathname: window.location.hash.slice(1)}}}>
            {this.props.children}
        </ThemeContext.Provider>
    )
}
```

```javascript
// Route.js
render() {
    // 由于小写会被判定为 HTML 节点，所以要转成首字母大写
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
```

### 2、实现 Link 标签更新 UI 渲染

查看原 router 库的最终渲染结果，直观表现就是一个 a 标签，按照该表现进行 render , ~~<a href={'#' + this.props.to}>{this.props.children}</a>~~。渲染正常，但点击 Link 后，虽然路由对应更改，但是并没有触发组件渲染更新，所以路由切换并不是由 a 标签的原生表现实现的。

内部绑定了 click 事件，并拦截了默认操作，来实现功能定制。调用 context.history.push 方法，来修改路由，并通过 setState 触发更新。