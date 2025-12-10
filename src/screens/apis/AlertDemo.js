/**
 * AlertDemo.js - Alert API 演示
 * 
 * Alert 用于显示系统原生的警告/确认对话框。
 * 
 * 【学习要点】
 * 1. 简单提示框
 * 2. 带按钮的确认框
 * 3. 多按钮对话框
 * 4. 输入框（仅 iOS）
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const AlertDemo = ({ onBack }) => {
    const [result, setResult] = useState('等待操作...');

    // 1. 简单提示
    const showSimpleAlert = () => {
        Alert.alert('提示', '这是一个简单的提示框');
        setResult('显示了简单提示框');
    };

    // 2. 带确认按钮
    const showConfirmAlert = () => {
        Alert.alert(
            '确认操作',                          // 标题
            '确定要执行此操作吗？',                // 消息
            [
                {
                    text: '取消',
                    onPress: () => setResult('点击了取消'),
                    style: 'cancel',                  // iOS 样式
                },
                {
                    text: '确定',
                    onPress: () => setResult('点击了确定'),
                },
            ]
        );
    };

    // 3. 三个按钮
    const showThreeButtonAlert = () => {
        Alert.alert(
            '保存文件',
            '是否保存当前更改？',
            [
                {
                    text: '不保存',
                    onPress: () => setResult('选择了不保存'),
                    style: 'destructive',             // iOS 红色
                },
                {
                    text: '取消',
                    onPress: () => setResult('选择了取消'),
                    style: 'cancel',
                },
                {
                    text: '保存',
                    onPress: () => setResult('选择了保存'),
                },
            ]
        );
    };

    // 4. 不可取消的对话框
    const showUncancellableAlert = () => {
        Alert.alert(
            '重要提示',
            '请阅读并接受服务条款',
            [
                {
                    text: '我已阅读并同意',
                    onPress: () => setResult('接受了服务条款'),
                },
            ],
            { cancelable: false }  // Android 上点击外部区域不会关闭
        );
    };

    // 5. iOS 输入框（仅 iOS 支持）
    const showPromptAlert = () => {
        if (Platform.OS === 'ios') {
            Alert.prompt(
                '请输入',
                '输入你的名字',
                [
                    {
                        text: '取消',
                        onPress: () => setResult('取消了输入'),
                        style: 'cancel',
                    },
                    {
                        text: '确定',
                        onPress: (name) => setResult(`输入了: ${name}`),
                    },
                ],
                'plain-text',         // 输入类型
                '',                   // 默认值
                'default'             // 键盘类型
            );
        } else {
            Alert.alert('提示', 'Alert.prompt 仅支持 iOS');
            setResult('Alert.prompt 仅支持 iOS');
        }
    };

    return (
        <DemoContainer title="Alert 弹窗" onBack={onBack}>
            {/* 结果显示 */}
            <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>操作结果：</Text>
                <Text style={styles.resultText}>{result}</Text>
            </View>

            {/* 按钮列表 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alert 类型</Text>

                {/* 1. 简单提示 */}
                <AlertButton
                    title="1. 简单提示"
                    description="只有一个确定按钮"
                    onPress={showSimpleAlert}
                />

                {/* 2. 确认框 */}
                <AlertButton
                    title="2. 确认框"
                    description="确定 / 取消 两个按钮"
                    onPress={showConfirmAlert}
                />

                {/* 3. 三个按钮 */}
                <AlertButton
                    title="3. 三个按钮"
                    description="保存 / 不保存 / 取消"
                    onPress={showThreeButtonAlert}
                />

                {/* 4. 不可取消 */}
                <AlertButton
                    title="4. 不可取消"
                    description="Android 点击外部不关闭"
                    onPress={showUncancellableAlert}
                />

                {/* 5. 输入框 */}
                <AlertButton
                    title="5. 输入框 (iOS only)"
                    description="Alert.prompt 输入文本"
                    onPress={showPromptAlert}
                />
            </View>

            {/* 代码示例 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>代码示例</Text>
                <View style={styles.codeBlock}>
                    <Text style={styles.code}>
                        {`Alert.alert(
  '标题',
  '消息内容',
  [
    { text: '取消', style: 'cancel' },
    { text: '确定', onPress: () => {} },
  ],
  { cancelable: false }
);`}
                    </Text>
                </View>
            </View>

            {/* 按钮样式说明 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>按钮 style 属性 (iOS)</Text>
                <View style={styles.styleList}>
                    <StyleItem name="default" desc="默认样式" />
                    <StyleItem name="cancel" desc="取消按钮，加粗" />
                    <StyleItem name="destructive" desc="删除操作，红色" />
                </View>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• Alert.alert(标题, 消息, 按钮数组, 选项)</Text>
                    <Text style={styles.summaryText}>• 按钮数组每项: {'{text, onPress, style}'}</Text>
                    <Text style={styles.summaryText}>• iOS 最多3个按钮，Android 无限制</Text>
                    <Text style={styles.summaryText}>• Alert.prompt 仅 iOS 支持</Text>
                </View>
            </View>
        </DemoContainer>
    );
};

/**
 * Alert 按钮组件
 */
const AlertButton = ({ title, description, onPress }) => (
    <TouchableOpacity style={styles.alertButton} onPress={onPress}>
        <View>
            <Text style={styles.alertButtonTitle}>{title}</Text>
            <Text style={styles.alertButtonDesc}>{description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
);

/**
 * 样式项组件
 */
const StyleItem = ({ name, desc }) => (
    <View style={styles.styleItem}>
        <Text style={styles.styleName}>{name}</Text>
        <Text style={styles.styleDesc}>{desc}</Text>
    </View>
);

const styles = StyleSheet.create({
    resultBox: {
        backgroundColor: '#6200EE',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    resultLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    resultText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
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

    // Alert 按钮
    alertButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    alertButtonTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    alertButtonDesc: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    arrow: {
        fontSize: 16,
        color: '#ccc',
    },

    // 代码
    codeBlock: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#333',
    },

    // 样式列表
    styleList: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    styleItem: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    styleName: {
        fontFamily: 'monospace',
        color: '#E91E63',
        width: 100,
    },
    styleDesc: {
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

export default AlertDemo;
