/**
 * PropsDemo.js - Props（属性）演示
 * 
 * Props 是组件之间传递数据的主要方式。
 * 父组件通过 props 向子组件传递数据，props 是只读的。
 * 
 * 【学习要点】
 * 1. Props 的基本用法
 * 2. 传递不同类型的数据
 * 3. Props 解构
 * 4. 默认 Props
 * 5. 传递函数作为 Props
 * 6. children Props
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DemoContainer from '../../components/DemoContainer';

// ==================== 
// 子组件定义
// ====================

/**
 * 1. 基础组件 - 接收简单 props
 * 
 * 组件就像一个函数，props 就是它的参数
 */
const Greeting = (props) => {
    // props 是一个对象，包含所有传入的属性
    return (
        <Text style={styles.greeting}>
            你好，{props.name}！欢迎学习 React Native
        </Text>
    );
};

/**
 * 2. 使用解构 - 更简洁的写法（推荐）
 * 
 * 直接在参数中解构出需要的属性
 */
const UserCard = ({ name, age, city }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>用户信息卡片</Text>
            <Text style={styles.cardText}>姓名：{name}</Text>
            <Text style={styles.cardText}>年龄：{age} 岁</Text>
            <Text style={styles.cardText}>城市：{city}</Text>
        </View>
    );
};

/**
 * 3. 默认 Props - 使用 ES6 默认参数
 * 
 * 当没有传入某个 prop 时，使用默认值
 */
const Button = ({
    title = '按钮',           // 默认标题
    color = '#6200EE',        // 默认颜色
    size = 'medium',          // 默认尺寸
    onPress                   // 点击回调（可选）
}) => {
    // 根据 size prop 计算样式
    const sizeStyles = {
        small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 12 },
        medium: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 14 },
        large: { paddingVertical: 14, paddingHorizontal: 28, fontSize: 16 },
    };

    const currentSize = sizeStyles[size] || sizeStyles.medium;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: color },
                { paddingVertical: currentSize.paddingVertical },
                { paddingHorizontal: currentSize.paddingHorizontal },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, { fontSize: currentSize.fontSize }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

/**
 * 4. 传递函数作为 Props
 * 
 * 子组件可以通过调用 prop 函数来与父组件通信
 */
const Counter = ({ count, onIncrement, onDecrement }) => {
    return (
        <View style={styles.counter}>
            <TouchableOpacity style={styles.counterBtn} onPress={onDecrement}>
                <Text style={styles.counterBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>{count}</Text>

            <TouchableOpacity style={styles.counterBtn} onPress={onIncrement}>
                <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

/**
 * 5. children Prop - 特殊的 prop
 * 
 * 组件标签之间的内容会作为 children prop 传入
 */
const Card = ({ title, children }) => {
    return (
        <View style={styles.containerCard}>
            <Text style={styles.cardHeader}>{title}</Text>
            <View style={styles.cardBody}>
                {/* children 是组件标签之间的内容 */}
                {children}
            </View>
        </View>
    );
};

/**
 * 6. 传递对象作为 Props - 展开运算符
 */
const ProductCard = ({ product }) => {
    return (
        <View style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>¥{product.price}</Text>
            <Text style={styles.productDesc}>{product.description}</Text>
        </View>
    );
};

// ==================== 
// 主演示组件
// ====================
const PropsDemo = ({ onBack }) => {
    // 用于 Counter 组件的状态
    const [count, setCount] = useState(0);

    // 用于展示函数 prop 的处理结果
    const [message, setMessage] = useState('');

    // 产品数据对象
    const product = {
        name: 'React Native 入门教程',
        price: 99.00,
        description: '从零开始学习 RN 开发',
    };

    return (
        <DemoContainer title="Props 属性" onBack={onBack}>
            {/* 1. 基础 Props 传递 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. 基础 Props</Text>
                <Text style={styles.code}>
                    {'<Greeting name="李四" />'}
                </Text>
                {/* 传递字符串 prop */}
                <Greeting name="李四" />
            </View>

            {/* 2. 多个 Props */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. 多个 Props</Text>
                <Text style={styles.code}>
                    {'<UserCard name="王五" age={28} city="北京" />'}
                </Text>
                <UserCard name="王五" age={28} city="北京" />
            </View>

            {/* 3. 默认 Props */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 默认 Props</Text>
                <Text style={styles.tip}>不传参数时使用默认值</Text>

                <View style={styles.buttonRow}>
                    {/* 使用全部默认值 */}
                    <Button />

                    {/* 覆盖部分默认值 */}
                    <Button title="小按钮" size="small" color="#4CAF50" />

                    {/* 覆盖全部默认值 */}
                    <Button title="大按钮" size="large" color="#F44336" />
                </View>
            </View>

            {/* 4. 函数 Props - 子组件调用父组件的方法 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. 函数 Props</Text>
                <Text style={styles.tip}>子组件通过调用函数 prop 与父组件通信</Text>

                <Counter
                    count={count}
                    onIncrement={() => setCount(prev => prev + 1)}
                    onDecrement={() => setCount(prev => prev - 1)}
                />

                {/* 另一个函数 prop 示例 */}
                <Button
                    title="点击显示消息"
                    onPress={() => setMessage('按钮被点击了！')}
                />
                {message ? (
                    <Text style={styles.messageText}>{message}</Text>
                ) : null}
            </View>

            {/* 5. children Prop */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. children Prop</Text>
                <Text style={styles.tip}>组件标签之间的内容作为 children</Text>

                <Card title="自定义内容卡片">
                    {/* 这些内容会作为 children 传入 Card 组件 */}
                    <Text>这是卡片内的第一行文字</Text>
                    <Text style={{ marginTop: 8 }}>这是卡片内的第二行文字</Text>
                    <Button title="卡片内的按钮" size="small" />
                </Card>
            </View>

            {/* 6. 传递对象 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>6. 传递对象</Text>
                <Text style={styles.code}>
                    {'<ProductCard product={productObject} />'}
                </Text>
                <ProductCard product={product} />
            </View>

            {/* Props 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 Props 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• Props 是只读的，不能在子组件中修改</Text>
                    <Text style={styles.summaryText}>• 使用 { } 传递非字符串类型的值</Text>
                    <Text style={styles.summaryText}>• 可以传递任何类型：字符串、数字、对象、数组、函数</Text>
                    <Text style={styles.summaryText}>• children 是特殊的 prop，代表子元素</Text>
                    <Text style={styles.summaryText}>• 使用解构让代码更简洁</Text>
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
    },
    tip: {
        fontSize: 12,
        color: '#888',
        marginBottom: 12,
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 12,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginBottom: 12,
        color: '#E91E63',
    },

    // Greeting 组件样式
    greeting: {
        fontSize: 16,
        color: '#6200EE',
        padding: 12,
        backgroundColor: '#F3E5F5',
        borderRadius: 8,
    },

    // UserCard 组件样式
    card: {
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 8,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2E7D32',
    },
    cardText: {
        color: '#333',
        marginVertical: 2,
    },

    // Button 组件样式
    button: {
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },

    // Counter 组件样式
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    counterBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterBtnText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 24,
        minWidth: 40,
        textAlign: 'center',
    },

    // Card 容器组件样式
    containerCard: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    cardHeader: {
        backgroundColor: '#6200EE',
        color: '#fff',
        padding: 12,
        fontWeight: 'bold',
    },
    cardBody: {
        padding: 12,
    },

    // ProductCard 样式
    productCard: {
        backgroundColor: '#FFF8E1',
        padding: 12,
        borderRadius: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6F00',
    },
    productPrice: {
        fontSize: 18,
        color: '#F44336',
        fontWeight: 'bold',
        marginTop: 4,
    },
    productDesc: {
        color: '#666',
        marginTop: 4,
    },

    // 消息文字
    messageText: {
        textAlign: 'center',
        color: '#4CAF50',
        marginTop: 12,
        fontSize: 16,
    },

    // 总结框
    summaryBox: {
        backgroundColor: '#E3F2FD',
        padding: 12,
        borderRadius: 8,
    },
    summaryText: {
        color: '#1565C0',
        marginVertical: 2,
    },
});

export default PropsDemo;
