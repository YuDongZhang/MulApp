/**
 * TextInputDemo.js - TextInput 组件演示
 * 
 * TextInput 是用户输入文本的核心组件。
 * 
 * 【学习要点】
 * 1. 基本用法（受控组件）
 * 2. 占位符和样式
 * 3. 键盘类型
 * 4. 多行输入
 * 5. 密码输入
 * 6. 输入验证
 */

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const TextInputDemo = ({ onBack }) => {
    // 各种输入状态
    const [basicText, setBasicText] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [multilineText, setMultilineText] = useState('');
    const [number, setNumber] = useState('');

    // 密码可见状态
    const [showPassword, setShowPassword] = useState(false);

    // 用于焦点控制的 ref
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <DemoContainer
            title="TextInput 输入框"
            onBack={onBack}
            scrollable={false}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.scrollView}>
                    {/* 1. 基本用法 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. 基本用法（受控组件）</Text>

                        <TextInput
                            style={styles.input}
                            // value: 绑定状态值
                            value={basicText}
                            // onChangeText: 文本变化时更新状态
                            onChangeText={setBasicText}
                            // placeholder: 占位符文本
                            placeholder="请输入文字..."
                            // placeholderTextColor: 占位符颜色
                            placeholderTextColor="#999"
                        />

                        <Text style={styles.result}>
                            输入内容: {basicText || '(空)'}
                        </Text>

                        <Text style={styles.code}>
                            {'value={text} onChangeText={setText}'}
                        </Text>
                    </View>

                    {/* 2. 键盘类型 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. 键盘类型 (keyboardType)</Text>

                        {/* 邮箱键盘 */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>email-address:</Text>
                            <TextInput
                                ref={emailRef}
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="your@email.com"
                                keyboardType="email-address"
                                // 自动小写
                                autoCapitalize="none"
                                // 自动更正关闭
                                autoCorrect={false}
                                // 按下回车跳转到下一个输入框
                                returnKeyType="next"
                                onSubmitEditing={() => phoneRef.current?.focus()}
                            />
                        </View>

                        {/* 电话键盘 */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>phone-pad:</Text>
                            <TextInput
                                ref={phoneRef}
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="138xxxxxxxx"
                                keyboardType="phone-pad"
                                // 最大长度
                                maxLength={11}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />
                        </View>

                        {/* 数字键盘 */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>numeric:</Text>
                            <TextInput
                                style={styles.input}
                                value={number}
                                onChangeText={setNumber}
                                placeholder="只能输入数字"
                                keyboardType="numeric"
                            />
                        </View>

                        <Text style={styles.tip}>
                            其他类型: decimal-pad, number-pad, url, visible-password
                        </Text>
                    </View>

                    {/* 3. 密码输入 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. 密码输入</Text>

                        <View style={styles.passwordContainer}>
                            <TextInput
                                ref={passwordRef}
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="请输入密码"
                                // secureTextEntry: 密码模式
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                returnKeyType="done"
                            />

                            {/* 切换密码可见性按钮 */}
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.eyeIcon}>
                                    {showPassword ? '🙈' : '👁️'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.code}>
                            {'secureTextEntry={true}'}
                        </Text>
                    </View>

                    {/* 4. 多行输入 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. 多行输入</Text>

                        <TextInput
                            style={styles.multilineInput}
                            value={multilineText}
                            onChangeText={setMultilineText}
                            placeholder="请输入多行文字..."
                            // multiline: 启用多行
                            multiline={true}
                            // numberOfLines: 显示的行数（Android）
                            numberOfLines={4}
                            // textAlignVertical: 文字垂直对齐
                            textAlignVertical="top"
                        />

                        <Text style={styles.charCount}>
                            {multilineText.length} / 200 字符
                        </Text>
                    </View>

                    {/* 5. 输入框状态样式 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. 焦点状态样式</Text>

                        <FocusableInput placeholder="点击查看焦点效果" />
                    </View>

                    {/* 6. 常用属性总结 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>📝 常用属性总结</Text>
                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryText}>• value + onChangeText: 受控组件</Text>
                            <Text style={styles.summaryText}>• placeholder: 占位符</Text>
                            <Text style={styles.summaryText}>• keyboardType: 键盘类型</Text>
                            <Text style={styles.summaryText}>• secureTextEntry: 密码模式</Text>
                            <Text style={styles.summaryText}>• multiline: 多行输入</Text>
                            <Text style={styles.summaryText}>• maxLength: 最大长度</Text>
                            <Text style={styles.summaryText}>• autoFocus: 自动聚焦</Text>
                            <Text style={styles.summaryText}>• editable: 是否可编辑</Text>
                            <Text style={styles.summaryText}>• returnKeyType: 回车键类型</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </DemoContainer>
    );
};

/**
 * 可聚焦输入框组件
 * 演示如何根据焦点状态改变样式
 */
const FocusableInput = ({ placeholder }) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                ]}
                value={text}
                onChangeText={setText}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <Text style={styles.focusStatus}>
                状态: {isFocused ? '✅ 聚焦中' : '⬜ 未聚焦'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
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
        marginTop: 8,
        fontStyle: 'italic',
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 11,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginTop: 12,
        color: '#E91E63',
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    result: {
        fontSize: 14,
        color: '#6200EE',
        marginTop: 8,
    },

    // 输入框样式
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputFocused: {
        borderColor: '#6200EE',
        borderWidth: 2,
        shadowColor: '#6200EE',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 12,
    },

    // 密码输入
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
        padding: 4,
    },
    eyeIcon: {
        fontSize: 20,
    },

    // 多行输入
    multilineInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
    },
    charCount: {
        textAlign: 'right',
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },

    // 焦点状态
    focusStatus: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
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
        fontSize: 12,
    },
});

export default TextInputDemo;
