/**
 * StateDemo.js - State（状态）演示
 * 
 * State 是组件内部的数据，当 state 改变时，组件会自动重新渲染。
 * 在函数组件中，我们使用 useState Hook 来管理状态。
 * 
 * 【学习要点】
 * 1. useState Hook 基本用法
 * 2. 状态更新触发重新渲染
 * 3. 函数式状态更新
 * 4. 管理复杂状态（对象、数组）
 * 5. 多个状态变量
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const StateDemo = ({ onBack }) => {
    // ==================== 
    // 1. 基本状态 - 数字
    // useState 返回一个数组：[当前状态值, 更新状态的函数]
    // ====================
    const [count, setCount] = useState(0);

    // ==================== 
    // 2. 字符串状态
    // ====================
    const [name, setName] = useState('');

    // ==================== 
    // 3. 布尔状态
    // ====================
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // ==================== 
    // 4. 对象状态
    // ====================
    const [user, setUser] = useState({
        name: '张三',
        age: 25,
        email: 'zhangsan@example.com',
    });

    // ==================== 
    // 5. 数组状态
    // ====================
    const [todos, setTodos] = useState([
        { id: 1, text: '学习 React Native', done: false },
        { id: 2, text: '写一个示例应用', done: false },
        { id: 3, text: '部署到手机', done: true },
    ]);
    const [newTodo, setNewTodo] = useState('');

    // ==================== 
    // 状态更新函数
    // ====================

    // 直接更新
    const increment = () => {
        setCount(count + 1);
    };

    // 函数式更新 - 当新状态依赖于旧状态时使用（推荐）
    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    // 重置
    const reset = () => {
        setCount(0);
    };

    // 更新对象状态 - 必须展开原对象，只更新需要的字段
    const updateUserAge = () => {
        setUser(prevUser => ({
            ...prevUser,        // 展开原对象的所有属性
            age: prevUser.age + 1,  // 更新 age 字段
        }));
    };

    // 添加新的待办事项
    const addTodo = () => {
        if (newTodo.trim() === '') return;

        setTodos(prevTodos => [
            ...prevTodos,  // 展开原数组
            {
                id: Date.now(),  // 使用时间戳作为唯一 ID
                text: newTodo,
                done: false,
            },
        ]);
        setNewTodo('');  // 清空输入框
    };

    // 切换待办事项完成状态
    const toggleTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, done: !todo.done }  // 找到目标项，切换 done
                    : todo                            // 其他项保持不变
            )
        );
    };

    // 删除待办事项
    const deleteTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <DemoContainer
            title="State 状态"
            onBack={onBack}
        >
            {/* 1. 基础计数器 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. 基础状态 (useState)</Text>
                <Text style={styles.code}>
                    {`const [count, setCount] = useState(0);`}
                </Text>

                <View style={styles.counterContainer}>
                    <TouchableOpacity style={styles.btn} onPress={decrement}>
                        <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.countText}>{count}</Text>

                    <TouchableOpacity style={styles.btn} onPress={increment}>
                        <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.resetBtn} onPress={reset}>
                    <Text style={styles.resetBtnText}>重置</Text>
                </TouchableOpacity>

                <Text style={styles.tip}>
                    💡 每次点击按钮，状态更新，组件重新渲染
                </Text>
            </View>

            {/* 2. 字符串状态 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. 字符串状态</Text>
                <TextInput
                    style={styles.input}
                    placeholder="输入你的名字..."
                    value={name}
                    onChangeText={setName}  // 等同于 (text) => setName(text)
                />
                <Text style={styles.displayText}>
                    你好，{name || '陌生人'}！
                </Text>
            </View>

            {/* 3. 布尔状态 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 布尔状态</Text>

                {/* 切换可见性 */}
                <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <Text style={styles.toggleBtnText}>
                        {isVisible ? '隐藏内容' : '显示内容'}
                    </Text>
                </TouchableOpacity>

                {/* 根据状态条件渲染 */}
                {isVisible && (
                    <View style={styles.visibleContent}>
                        <Text>🎉 这段内容可以被显示/隐藏</Text>
                    </View>
                )}

                {/* 切换主题 */}
                <View style={styles.divider} />
                <TouchableOpacity
                    style={[
                        styles.themeBtn,
                        isDarkMode && styles.themeBtnDark
                    ]}
                    onPress={() => setIsDarkMode(!isDarkMode)}
                >
                    <Text style={[
                        styles.themeBtnText,
                        isDarkMode && styles.themeBtnTextDark
                    ]}>
                        {isDarkMode ? '🌙 深色模式' : '☀️ 浅色模式'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 4. 对象状态 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. 对象状态</Text>
                <Text style={styles.code}>
                    {`setUser(prev => ({ ...prev, age: prev.age + 1 }))`}
                </Text>

                <View style={styles.userCard}>
                    <Text style={styles.userInfo}>👤 姓名：{user.name}</Text>
                    <Text style={styles.userInfo}>🎂 年龄：{user.age}</Text>
                    <Text style={styles.userInfo}>📧 邮箱：{user.email}</Text>
                </View>

                <TouchableOpacity style={styles.ageBtn} onPress={updateUserAge}>
                    <Text style={styles.ageBtnText}>🎂 过生日（年龄+1）</Text>
                </TouchableOpacity>

                <Text style={styles.warning}>
                    ⚠️ 更新对象状态时，必须创建新对象，不能直接修改原对象！
                </Text>
            </View>

            {/* 5. 数组状态 - Todo List */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. 数组状态 (Todo List)</Text>

                {/* 添加新项 */}
                <View style={styles.addTodoRow}>
                    <TextInput
                        style={styles.todoInput}
                        placeholder="输入新任务..."
                        value={newTodo}
                        onChangeText={setNewTodo}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
                        <Text style={styles.addBtnText}>添加</Text>
                    </TouchableOpacity>
                </View>

                {/* Todo 列表 */}
                {todos.map(todo => (
                    <View key={todo.id} style={styles.todoItem}>
                        <TouchableOpacity
                            style={styles.todoCheckbox}
                            onPress={() => toggleTodo(todo.id)}
                        >
                            <Text>{todo.done ? '✅' : '⬜'}</Text>
                        </TouchableOpacity>

                        <Text style={[
                            styles.todoText,
                            todo.done && styles.todoTextDone
                        ]}>
                            {todo.text}
                        </Text>

                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => deleteTodo(todo.id)}
                        >
                            <Text style={styles.deleteBtnText}>❌</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.tip}>
                    💡 添加：[...prev, newItem] | 删除：filter() | 修改：map()
                </Text>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 State 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• useState 返回 [值, 更新函数]</Text>
                    <Text style={styles.summaryText}>• 状态更新会触发组件重新渲染</Text>
                    <Text style={styles.summaryText}>• 依赖旧值时使用函数式更新</Text>
                    <Text style={styles.summaryText}>• 更新对象/数组需创建新引用</Text>
                    <Text style={styles.summaryText}>• 不要直接修改 state 变量</Text>
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
    code: {
        fontFamily: 'monospace',
        fontSize: 11,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginBottom: 12,
        color: '#E91E63',
    },
    tip: {
        fontSize: 12,
        color: '#888',
        marginTop: 12,
        fontStyle: 'italic',
    },
    warning: {
        fontSize: 12,
        color: '#FF5722',
        marginTop: 8,
        backgroundColor: '#FFF3E0',
        padding: 8,
        borderRadius: 4,
    },

    // 计数器
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    countText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginHorizontal: 30,
        minWidth: 60,
        textAlign: 'center',
    },
    resetBtn: {
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderRadius: 4,
    },
    resetBtnText: {
        color: '#666',
    },

    // 输入框
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },
    displayText: {
        fontSize: 18,
        color: '#6200EE',
        textAlign: 'center',
    },

    // 切换按钮
    toggleBtn: {
        backgroundColor: '#03DAC6',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    toggleBtnText: {
        color: '#000',
        fontWeight: '600',
    },
    visibleContent: {
        backgroundColor: '#E8F5E9',
        padding: 16,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    themeBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    themeBtnDark: {
        backgroundColor: '#333',
        borderColor: '#333',
    },
    themeBtnText: {
        color: '#333',
        fontWeight: '600',
    },
    themeBtnTextDark: {
        color: '#fff',
    },

    // 用户卡片
    userCard: {
        backgroundColor: '#E3F2FD',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    userInfo: {
        fontSize: 14,
        marginVertical: 4,
    },
    ageBtn: {
        backgroundColor: '#FF9800',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    ageBtnText: {
        color: '#fff',
        fontWeight: '600',
    },

    // Todo List
    addTodoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    todoInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginRight: 8,
    },
    addBtn: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 8,
    },
    addBtnText: {
        color: '#fff',
        fontWeight: '600',
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginVertical: 4,
    },
    todoCheckbox: {
        marginRight: 12,
    },
    todoText: {
        flex: 1,
        fontSize: 14,
    },
    todoTextDone: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    deleteBtn: {
        padding: 4,
    },
    deleteBtnText: {
        fontSize: 12,
    },

    // 总结
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

export default StateDemo;
