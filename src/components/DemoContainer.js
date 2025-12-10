/**
 * DemoContainer.js - 演示容器组件
 * 
 * 这是一个可复用的容器组件，用于包装所有演示页面。
 * 提供统一的标题栏、返回按钮和内容区域。
 * 
 * 【学习要点】
 * 1. 如何创建可复用组件
 * 2. 使用 children 渲染子组件
 * 3. 通过 props 传递回调函数
 * 4. SafeAreaView 确保内容不被刘海/状态栏遮挡
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';

/**
 * DemoContainer 组件
 * 
 * @param {string} title - 页面标题
 * @param {function} onBack - 返回按钮的点击回调
 * @param {ReactNode} children - 子组件内容
 * @param {boolean} scrollable - 是否可滚动，默认 true
 */
const DemoContainer = ({ title, onBack, children, scrollable = true }) => {
    // 根据 scrollable 属性决定使用 ScrollView 还是 View
    const ContentWrapper = scrollable ? ScrollView : View;

    return (
        // SafeAreaView：确保内容在安全区域内显示
        // 特别是在有刘海屏或底部手势条的设备上
        <SafeAreaView style={styles.safeArea}>
            {/* 标题栏 */}
            <View style={styles.header}>
                {/* 返回按钮 - 使用 TouchableOpacity 实现点击效果 */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                    // activeOpacity：按下时的透明度，默认是 0.2
                    activeOpacity={0.7}
                >
                    <Text style={styles.backText}>← 返回</Text>
                </TouchableOpacity>

                {/* 标题文字 */}
                <Text style={styles.title}>{title}</Text>

                {/* 占位符，用于让标题居中 */}
                <View style={styles.placeholder} />
            </View>

            {/* 内容区域 */}
            <ContentWrapper
                style={styles.content}
                // 如果是 ScrollView，添加内边距
                contentContainerStyle={scrollable ? styles.scrollContent : null}
            >
                {/* children 是 React 的特殊 prop，代表组件的子元素 */}
                {children}
            </ContentWrapper>
        </SafeAreaView>
    );
};

/**
 * 样式定义
 * 使用 StyleSheet.create() 创建样式表
 * 这比内联样式更高效，因为样式只会被创建一次
 */
const styles = StyleSheet.create({
    // 安全区域容器
    safeArea: {
        flex: 1,                    // 占满整个屏幕
        backgroundColor: '#f5f5f5', // 浅灰背景色
    },

    // 顶部标题栏
    header: {
        flexDirection: 'row',       // 水平排列
        alignItems: 'center',       // 垂直居中
        justifyContent: 'space-between', // 两端对齐
        backgroundColor: '#6200EE', // Material Design 紫色
        paddingVertical: 12,
        paddingHorizontal: 16,
        // 阴影效果 (Android)
        elevation: 4,
        // 阴影效果 (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    // 返回按钮
    backButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },

    // 返回按钮文字
    backText: {
        color: '#fff',
        fontSize: 16,
    },

    // 标题文字
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,                    // 占据剩余空间
        textAlign: 'center',        // 文字居中
    },

    // 右侧占位符（让标题真正居中）
    placeholder: {
        width: 60,                  // 与返回按钮宽度相同
    },

    // 内容容器
    content: {
        flex: 1,
    },

    // ScrollView 的内容样式
    scrollContent: {
        padding: 16,
    },
});

// 导出组件供其他文件使用
export default DemoContainer;
