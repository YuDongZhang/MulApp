/**
 * index.js - React Native 应用入口文件
 * 
 * 这是 React Native 应用的入口点。
 * AppRegistry.registerComponent 将 JS 组件注册为根组件。
 * 'MulApp' 必须与 Android 端 getMainComponentName() 返回的值一致。
 */

import { AppRegistry } from 'react-native';
import App from './src/App';

// 注册根组件
// 第一个参数是组件名称，必须与 Android/iOS 原生代码中的名称一致
// 第二个参数是返回根组件的函数
AppRegistry.registerComponent('MulApp', () => App);
