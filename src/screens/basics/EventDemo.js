/**
 * EventDemo.js - 事件处理演示
 * 
 * 事件处理是用户交互的核心。React Native 提供多种事件处理方式。
 * 
 * 【学习要点】
 * 1. 基本事件处理 (onPress)
 * 2. 触摸事件详解
 * 3. 文本输入事件
 * 4. 事件参数传递
 * 5. 手势事件
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Pressable,
    TextInput,
    ScrollView,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const EventDemo = ({ onBack }) => {
    // 事件日志
    const [eventLog, setEventLog] = useState([]);

    // 输入框状态
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // 添加事件日志
    const logEvent = (eventName) => {
        const timestamp = new Date().toLocaleTimeString();
        setEventLog(prev => [`${timestamp} - ${eventName}`, ...prev.slice(0, 9)]);
    };

    // 清空日志
    const clearLog = () => {
        setEventLog([]);
    };

    return (
        <DemoContainer
            title="事件处理"
            onBack={onBack}
            scrollable={false}  // 禁用外层滚动
        >
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    {/* 1. 基本点击事件 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. 基本点击事件 (onPress)</Text>
                        <Text style={styles.tip}>onPress 是最常用的点击事件</Text>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => logEvent('onPress 被触发')}
                            // onPressIn: 手指按下时立即触发
                            onPressIn={() => logEvent('onPressIn 手指按下')}
                            // onPressOut: 手指抬起时触发
                            onPressOut={() => logEvent('onPressOut 手指抬起')}
                            // onLongPress: 长按触发（默认500ms）
                            onLongPress={() => logEvent('onLongPress 长按触发')}
                            // 设置长按延迟时间
                            delayLongPress={800}
                            // 按下时的透明度
                            activeOpacity={0.6}
                        >
                            <Text style={styles.buttonText}>点击我 / 长按我</Text>
                        </TouchableOpacity>

                        <Text style={styles.code}>
                            {'onPress / onPressIn / onPressOut / onLongPress'}
                        </Text>
                    </View>

                    {/* 2. 不同的触摸组件 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. 触摸组件对比</Text>

                        {/* TouchableOpacity - 按下时变透明 */}
                        <TouchableOpacity
                            style={[styles.touchable, { backgroundColor: '#6200EE' }]}
                            onPress={() => logEvent('TouchableOpacity')}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.touchableText}>
                                TouchableOpacity{'\n'}
                                <Text style={styles.hint}>按下时变透明</Text>
                            </Text>
                        </TouchableOpacity>

                        {/* TouchableHighlight - 按下时有背景高亮 */}
                        <TouchableHighlight
                            style={[styles.touchable, { backgroundColor: '#03DAC6' }]}
                            onPress={() => logEvent('TouchableHighlight')}
                            underlayColor="#018786"  // 按下时的背景色
                        >
                            <Text style={[styles.touchableText, { color: '#000' }]}>
                                TouchableHighlight{'\n'}
                                <Text style={styles.hint}>按下时背景变色</Text>
                            </Text>
                        </TouchableHighlight>

                        {/* TouchableWithoutFeedback - 无视觉反馈 */}
                        <TouchableWithoutFeedback
                            onPress={() => logEvent('TouchableWithoutFeedback')}
                        >
                            <View style={[styles.touchable, { backgroundColor: '#FF5722' }]}>
                                <Text style={styles.touchableText}>
                                    TouchableWithoutFeedback{'\n'}
                                    <Text style={styles.hint}>无视觉反馈（不推荐）</Text>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {/* Pressable - 新一代触摸组件（推荐） */}
                        <Pressable
                            style={({ pressed }) => [
                                styles.touchable,
                                {
                                    backgroundColor: pressed ? '#1565C0' : '#2196F3',
                                    transform: [{ scale: pressed ? 0.96 : 1 }],
                                },
                            ]}
                            onPress={() => logEvent('Pressable')}
                        >
                            {({ pressed }) => (
                                <Text style={styles.touchableText}>
                                    Pressable {pressed ? '(按下中)' : ''}{'\n'}
                                    <Text style={styles.hint}>最灵活，样式可响应状态</Text>
                                </Text>
                            )}
                        </Pressable>
                    </View>

                    {/* 3. 文本输入事件 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. 文本输入事件</Text>

                        <TextInput
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused,
                            ]}
                            placeholder="输入文字试试..."
                            value={inputText}
                            // onChangeText: 文本改变时触发，直接接收新文本
                            onChangeText={(text) => {
                                setInputText(text);
                                if (text.length > 0) {
                                    logEvent(`文本改变: "${text}"`);
                                }
                            }}
                            // onFocus: 获取焦点时触发
                            onFocus={() => {
                                setIsFocused(true);
                                logEvent('输入框获取焦点');
                            }}
                            // onBlur: 失去焦点时触发
                            onBlur={() => {
                                setIsFocused(false);
                                logEvent('输入框失去焦点');
                            }}
                            // onSubmitEditing: 按下回车/提交时触发
                            onSubmitEditing={() => {
                                logEvent(`提交内容: "${inputText}"`);
                            }}
                        />

                        <Text style={styles.code}>
                            {'onChangeText / onFocus / onBlur / onSubmitEditing'}
                        </Text>
                    </View>

                    {/* 4. 事件参数传递 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. 事件参数传递</Text>
                        <Text style={styles.tip}>如何给事件处理函数传递额外参数</Text>

                        <View style={styles.buttonRow}>
                            {/* 方法一：箭头函数 */}
                            {['A', 'B', 'C'].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.paramButton}
                                    onPress={() => logEvent(`点击了按钮 ${item}`)}
                                >
                                    <Text style={styles.paramButtonText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.code}>
                            {'onPress={() => handlePress(参数)}'}
                        </Text>
                    </View>

                    {/* 5. 双击检测 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. 实现双击</Text>
                        <DoubleClickButton
                            onSingleClick={() => logEvent('单击')}
                            onDoubleClick={() => logEvent('双击')}
                        />
                    </View>

                    {/* 事件日志 */}
                    <View style={styles.section}>
                        <View style={styles.logHeader}>
                            <Text style={styles.sectionTitle}>📋 事件日志</Text>
                            <TouchableOpacity onPress={clearLog}>
                                <Text style={styles.clearText}>清空</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.logContainer}>
                            {eventLog.length === 0 ? (
                                <Text style={styles.logEmpty}>操作上面的组件查看事件...</Text>
                            ) : (
                                eventLog.map((log, index) => (
                                    <Text key={index} style={styles.logItem}>
                                        {log}
                                    </Text>
                                ))
                            )}
                        </View>
                    </View>

                    {/* 总结 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>📝 事件处理总结</Text>
                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryText}>• TouchableOpacity：最常用，按下变透明</Text>
                            <Text style={styles.summaryText}>• Pressable：最灵活，样式可响应状态</Text>
                            <Text style={styles.summaryText}>• onPress：点击事件</Text>
                            <Text style={styles.summaryText}>• onLongPress：长按事件</Text>
                            <Text style={styles.summaryText}>• onChangeText：文本变化事件</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </DemoContainer>
    );
};

/**
 * 双击按钮组件
 * 演示如何实现双击检测
 */
const DoubleClickButton = ({ onSingleClick, onDoubleClick }) => {
    const [lastPress, setLastPress] = useState(0);
    const DOUBLE_CLICK_DELAY = 300; // 双击间隔阈值

    const handlePress = () => {
        const now = Date.now();

        if (now - lastPress < DOUBLE_CLICK_DELAY) {
            // 双击
            onDoubleClick?.();
        } else {
            // 单击
            onSingleClick?.();
        }

        setLastPress(now);
    };

    return (
        <TouchableOpacity
            style={styles.doubleClickBtn}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.doubleClickText}>
                点击一次 = 单击{'\n'}
                快速点击两次 = 双击
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
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
        fontSize: 11,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginTop: 12,
        color: '#E91E63',
        textAlign: 'center',
    },

    // 按钮
    button: {
        backgroundColor: '#6200EE',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // 触摸组件
    touchable: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 4,
    },
    touchableText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    hint: {
        fontSize: 11,
        fontWeight: 'normal',
    },

    // 输入框
    input: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputFocused: {
        borderColor: '#6200EE',
    },

    // 参数按钮
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paramButton: {
        width: 50,
        height: 50,
        backgroundColor: '#9C27B0',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    paramButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // 双击按钮
    doubleClickBtn: {
        backgroundColor: '#FF9800',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    doubleClickText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },

    // 日志
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clearText: {
        color: '#6200EE',
        fontSize: 14,
    },
    logContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
    },
    logEmpty: {
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    logItem: {
        fontSize: 12,
        color: '#333',
        marginVertical: 2,
        fontFamily: 'monospace',
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

export default EventDemo;
