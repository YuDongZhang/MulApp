/**
 * JSXDemo.js - JSX 语法演示
 * 
 * JSX 是 JavaScript 的语法扩展，让你可以在 JS 中编写类似 HTML 的代码。
 * React Native 使用 JSX 来描述 UI 结构。
 * 
 * 【学习要点】
 * 1. JSX 基本语法
 * 2. 在 JSX 中嵌入 JavaScript 表达式
 * 3. JSX 属性
 * 4. 条件渲染
 * 5. 列表渲染
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const JSXDemo = ({ onBack }) => {
    // ===== 1. 变量 - 可以在 JSX 中使用 =====
    const name = '张三';
    const age = 25;

    // ===== 2. 数组 - 用于列表渲染 =====
    const fruits = ['苹果', '香蕉', '橙子', '葡萄'];

    // ===== 3. 布尔值 - 用于条件渲染 =====
    const isLoggedIn = true;
    const hasNotification = true;
    const notificationCount = 5;

    // ===== 4. 函数 - 可以返回 JSX =====
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return '上午好';
        if (hour < 18) return '下午好';
        return '晚上好';
    };

    return (
        <DemoContainer title="JSX 语法" onBack={onBack}>
            {/* ==================== 
          1. JSX 基础 - 嵌入表达式 
          使用 {} 大括号包裹 JavaScript 表达式
          ==================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. 嵌入表达式</Text>

                {/* 嵌入变量 */}
                <Text style={styles.text}>姓名：{name}</Text>

                {/* 嵌入表达式计算 */}
                <Text style={styles.text}>年龄：{age} 岁</Text>

                {/* 嵌入数学运算 */}
                <Text style={styles.text}>出生年份：{2024 - age}</Text>

                {/* 嵌入字符串拼接 */}
                <Text style={styles.text}>介绍：{'我是' + name + '，今年' + age + '岁'}</Text>

                {/* 嵌入模板字符串（推荐）*/}
                <Text style={styles.text}>模板：{`我是${name}，今年${age}岁`}</Text>

                {/* 嵌入函数调用 */}
                <Text style={styles.text}>问候：{getGreeting()}，{name}！</Text>
            </View>

            {/* ==================== 
          2. 条件渲染 
          根据条件决定渲染什么内容
          ==================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. 条件渲染</Text>

                {/* 方法一：三元运算符 (?:) - 最常用 */}
                <Text style={styles.text}>
                    登录状态：{isLoggedIn ? '已登录 ✓' : '未登录 ✗'}
                </Text>

                {/* 方法二：逻辑与 (&&) - 条件为 true 时渲染 */}
                {hasNotification && (
                    <Text style={[styles.text, styles.highlight]}>
                        📢 您有 {notificationCount} 条新通知
                    </Text>
                )}

                {/* 方法三：逻辑或 (||) - 提供默认值 */}
                <Text style={styles.text}>
                    用户名：{name || '匿名用户'}
                </Text>

                {/* 方法四：复杂条件 - 使用立即执行函数 */}
                <Text style={styles.text}>
                    年龄段：
                    {(() => {
                        if (age < 18) return '未成年';
                        if (age < 60) return '成年人';
                        return '老年人';
                    })()}
                </Text>
            </View>

            {/* ==================== 
          3. 列表渲染 
          使用 map() 方法将数组转换为 JSX 元素
          ==================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 列表渲染</Text>

                {/* 基本列表渲染 - key 是必须的，帮助 React 识别每个元素 */}
                {fruits.map((fruit, index) => (
                    <Text key={index} style={styles.listItem}>
                        • {fruit}
                    </Text>
                ))}

                <View style={styles.divider} />

                {/* 带索引的列表渲染 */}
                <Text style={styles.subTitle}>带序号的列表：</Text>
                {fruits.map((fruit, index) => (
                    <Text key={fruit} style={styles.listItem}>
                        {index + 1}. {fruit}
                    </Text>
                ))}
            </View>

            {/* ==================== 
          4. JSX 属性 
          类似 HTML 属性，但使用驼峰命名法
          ==================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. JSX 属性</Text>

                {/* style 属性 - 接受对象 */}
                <Text style={{ color: 'blue', fontSize: 16 }}>
                    内联样式（蓝色）
                </Text>

                {/* 多个样式合并 - 使用数组 */}
                <Text style={[styles.text, { fontWeight: 'bold' }]}>
                    合并样式（加粗）
                </Text>

                {/* 动态样式 */}
                <Text style={[
                    styles.text,
                    isLoggedIn ? styles.successText : styles.errorText
                ]}>
                    动态样式（根据登录状态变色）
                </Text>

                {/* 设置多行文本和行数限制 */}
                <Text
                    style={styles.text}
                    numberOfLines={2}  // 限制最多显示2行
                    ellipsizeMode="tail"  // 超出部分用省略号
                >
                    这是一段很长的文字，用来演示 numberOfLines 属性的效果。
                    当文字超过指定行数时，会自动截断并显示省略号...
                    这部分不会显示。
                </Text>
            </View>

            {/* ==================== 
          5. JSX 注意事项
          ==================== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. JSX 注意事项</Text>

                <View style={styles.noteBox}>
                    <Text style={styles.noteText}>
                        📌 JSX 必须有一个根元素包裹
                    </Text>
                    <Text style={styles.noteText}>
                        📌 使用 className → style
                    </Text>
                    <Text style={styles.noteText}>
                        📌 使用 onClick → onPress
                    </Text>
                    <Text style={styles.noteText}>
                        📌 所有标签必须闭合 {'<Image />'}</Text>
                    <Text style={styles.noteText}>
                        📌 使用驼峰命名：backgroundColor
                    </Text>
                </View>
            </View>
        </DemoContainer>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginTop: 8,
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: '#444',
        marginVertical: 4,
        lineHeight: 22,
    },
    highlight: {
        backgroundColor: '#FFF3E0',
        padding: 8,
        borderRadius: 4,
    },
    listItem: {
        fontSize: 14,
        color: '#444',
        marginLeft: 8,
        marginVertical: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    successText: {
        color: 'green',
    },
    errorText: {
        color: 'red',
    },
    noteBox: {
        backgroundColor: '#E3F2FD',
        padding: 12,
        borderRadius: 8,
    },
    noteText: {
        fontSize: 13,
        color: '#1565C0',
        marginVertical: 2,
    },
});

export default JSXDemo;
