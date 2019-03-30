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
    - 路由容器组件
    - 有两种模式可选
        - BrowserRouter：浏览器自带的 H5 API ，restful风格，需要后台配合
        - HashRouter：使用 hash 方式进行路由，路径后均有 # 
- route 
    - 单条路由规则，存在多个
    - 渲染时给组件传入 props 如下：
        <img src="./images/react-router-props.png">