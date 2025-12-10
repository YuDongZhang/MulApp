/**
 * App.js - React Native 学习应用主入口
 * 
 * 这是应用的主组件，实现了简单的页面导航系统。
 * 不使用 react-navigation 库，通过状态管理实现页面切换。
 * 
 * 【学习要点】
 * 1. 应用结构组织
 * 2. 简单的页面路由
 * 3. 组件按需加载
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// 首页
import HomeScreen from './screens/HomeScreen';

// 基础概念
import JSXDemo from './screens/basics/JSXDemo';
import PropsDemo from './screens/basics/PropsDemo';
import StateDemo from './screens/basics/StateDemo';
import EventDemo from './screens/basics/EventDemo';

// 核心组件
import ViewTextDemo from './screens/components/ViewTextDemo';
import ImageDemo from './screens/components/ImageDemo';
import TextInputDemo from './screens/components/TextInputDemo';
import ButtonDemo from './screens/components/ButtonDemo';
import ScrollViewDemo from './screens/components/ScrollViewDemo';
import FlatListDemo from './screens/components/FlatListDemo';
import SectionListDemo from './screens/components/SectionListDemo';

// 样式布局
import StyleSheetDemo from './screens/styles/StyleSheetDemo';
import FlexboxDemo from './screens/styles/FlexboxDemo';

// 平台 API
import AlertDemo from './screens/apis/AlertDemo';
import ModalDemo from './screens/apis/ModalDemo';
import StatusBarDemo from './screens/apis/StatusBarDemo';
import ActivityIndicatorDemo from './screens/apis/ActivityIndicatorDemo';
import SwitchDemo from './screens/apis/SwitchDemo';
import PlatformDemo from './screens/apis/PlatformDemo';

/**
 * 页面组件映射表
 * 将页面名称映射到对应的组件
 */
const SCREENS = {
    // 基础概念
    JSXDemo,
    PropsDemo,
    StateDemo,
    EventDemo,
    // 核心组件
    ViewTextDemo,
    ImageDemo,
    TextInputDemo,
    ButtonDemo,
    ScrollViewDemo,
    FlatListDemo,
    SectionListDemo,
    // 样式布局
    StyleSheetDemo,
    FlexboxDemo,
    // 平台 API
    AlertDemo,
    ModalDemo,
    StatusBarDemo,
    ActivityIndicatorDemo,
    SwitchDemo,
    PlatformDemo,
};

/**
 * App 主组件
 * 
 * 使用状态管理实现简单的页面导航：
 * - currentScreen 为 null 时显示首页
 * - currentScreen 有值时显示对应的演示页面
 */
const App = () => {
    // 当前显示的页面名称
    const [currentScreen, setCurrentScreen] = useState(null);

    // 返回首页
    const goBack = () => {
        setCurrentScreen(null);
    };

    // 导航到指定页面
    const navigate = (screenName) => {
        setCurrentScreen(screenName);
    };

    // 获取当前应该渲染的组件
    const renderScreen = () => {
        // 如果没有选择页面，显示首页
        if (!currentScreen) {
            return <HomeScreen onNavigate={navigate} />;
        }

        // 根据页面名称获取对应组件
        const ScreenComponent = SCREENS[currentScreen];

        if (ScreenComponent) {
            return <ScreenComponent onBack={goBack} />;
        }

        // 如果找不到对应组件，返回首页
        return <HomeScreen onNavigate={navigate} />;
    };

    return (
        <View style={styles.container}>
            {renderScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default App;
