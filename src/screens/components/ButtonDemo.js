/**
 * ButtonDemo.js - 按钮和触摸组件演示
 * 
 * React Native 提供多种创建可点击元素的方式。
 * 
 * 【学习要点】
 * 1. Button 组件（简单但不灵活）
 * 2. TouchableOpacity（最常用）
 * 3. TouchableHighlight
 * 4. Pressable（最灵活）
 * 5. 自定义按钮
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    Pressable,
    StyleSheet,
    Alert,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const ButtonDemo = ({ onBack }) => {
    const [pressCount, setPressCount] = useState(0);
    const [lastAction, setLastAction] = useState('无');

    const handlePress = (action) => {
        setPressCount(prev => prev + 1);
        setLastAction(action);
    };

    return (
        <DemoContainer title="Button 按钮" onBack={onBack}>
            {/* 状态显示 */}
            <View style={styles.statusBar}>
                <Text style={styles.statusText}>点击次数: {pressCount}</Text>
                <Text style={styles.statusText}>最后操作: {lastAction}</Text>
            </View>

            {/* 1. Button 组件 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. Button 组件</Text>
                <Text style={styles.tip}>系统原生按钮，样式不可自定义</Text>

                <View style={styles.buttonRow}>
                    <Button
                        title="默认按钮"
                        onPress={() => handlePress('Button 默认')}
                    />

                    <View style={styles.spacer} />

                    <Button
                        title="有颜色"
                        color="#6200EE"
                        onPress={() => handlePress('Button 紫色')}
                    />

                    <View style={styles.spacer} />

                    <Button
                        title="禁用"
                        disabled={true}
                        onPress={() => { }}
                    />
                </View>

                <Text style={styles.warning}>
                    ⚠️ Button 样式有限，通常使用 TouchableOpacity 替代
                </Text>
            </View>

            {/* 2. TouchableOpacity */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. TouchableOpacity</Text>
                <Text style={styles.tip}>按下时变透明，最常用的方式</Text>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => handlePress('TouchableOpacity')}
                    activeOpacity={0.7}  // 按下时的透明度
                >
                    <Text style={styles.buttonText}>主要按钮</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => handlePress('次要按钮')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.secondaryButtonText}>次要按钮</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => handlePress('边框按钮')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.outlineButtonText}>边框按钮</Text>
                </TouchableOpacity>

                <Text style={styles.code}>
                    {'activeOpacity={0.7} // 按下时的透明度'}
                </Text>
            </View>

            {/* 3. TouchableHighlight */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. TouchableHighlight</Text>
                <Text style={styles.tip}>按下时显示底色</Text>

                <TouchableHighlight
                    style={styles.highlightButton}
                    onPress={() => handlePress('TouchableHighlight')}
                    underlayColor="#1565C0"  // 按下时的底色
                >
                    <Text style={styles.buttonText}>按下显示底色</Text>
                </TouchableHighlight>

                <Text style={styles.code}>
                    {'underlayColor="#1565C0" // 按下时的底色'}
                </Text>
            </View>

            {/* 4. Pressable */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. Pressable（推荐）</Text>
                <Text style={styles.tip}>最灵活的触摸组件</Text>

                {/* 基本用法 */}
                <Pressable
                    style={({ pressed }) => [
                        styles.pressableButton,
                        pressed && styles.pressableButtonPressed,
                    ]}
                    onPress={() => handlePress('Pressable 基本')}
                >
                    {({ pressed }) => (
                        <Text style={styles.buttonText}>
                            {pressed ? '按下中...' : '基本 Pressable'}
                        </Text>
                    )}
                </Pressable>

                {/* 带缩放效果 */}
                <Pressable
                    style={({ pressed }) => [
                        styles.scaleButton,
                        { transform: [{ scale: pressed ? 0.95 : 1 }] },
                    ]}
                    onPress={() => handlePress('Pressable 缩放')}
                >
                    <Text style={styles.buttonText}>按下缩放效果</Text>
                </Pressable>

                {/* 带涟漪效果（类似 Material Design） */}
                <Pressable
                    style={styles.rippleButton}
                    onPress={() => handlePress('Pressable 涟漪')}
                    android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
                >
                    <Text style={styles.buttonText}>涟漪效果（Android）</Text>
                </Pressable>

                <Text style={styles.code}>
                    {'style={({ pressed }) => [...]}'}
                </Text>
            </View>

            {/* 5. 自定义按钮组件 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. 自定义按钮组件</Text>

                <View style={styles.customButtonRow}>
                    <CustomButton
                        title="小"
                        size="small"
                        onPress={() => handlePress('小按钮')}
                    />
                    <CustomButton
                        title="中"
                        size="medium"
                        onPress={() => handlePress('中按钮')}
                    />
                    <CustomButton
                        title="大"
                        size="large"
                        onPress={() => handlePress('大按钮')}
                    />
                </View>

                <View style={styles.customButtonRow}>
                    <CustomButton
                        title="成功"
                        variant="success"
                        onPress={() => handlePress('成功')}
                    />
                    <CustomButton
                        title="警告"
                        variant="warning"
                        onPress={() => handlePress('警告')}
                    />
                    <CustomButton
                        title="危险"
                        variant="danger"
                        onPress={() => handlePress('危险')}
                    />
                </View>

                <CustomButton
                    title="禁用状态"
                    disabled={true}
                    onPress={() => { }}
                />

                <CustomButton
                    title="加载中..."
                    loading={true}
                    onPress={() => { }}
                />
            </View>

            {/* 6. 图标按钮 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>6. 图标按钮</Text>

                <View style={styles.iconButtonRow}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => handlePress('❤️')}
                    >
                        <Text style={styles.iconText}>❤️</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => handlePress('⭐')}
                    >
                        <Text style={styles.iconText}>⭐</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => handlePress('🔔')}
                    >
                        <Text style={styles.iconText}>🔔</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.iconButton, styles.iconButtonOutline]}
                        onPress={() => handlePress('➕')}
                    >
                        <Text style={styles.iconTextDark}>➕</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• Button: 简单但样式固定</Text>
                    <Text style={styles.summaryText}>• TouchableOpacity: 最常用</Text>
                    <Text style={styles.summaryText}>• TouchableHighlight: 有底色</Text>
                    <Text style={styles.summaryText}>• Pressable: 最灵活（推荐）</Text>
                    <Text style={styles.summaryText}>• 通常自定义按钮组件复用</Text>
                </View>
            </View>
        </DemoContainer>
    );
};

/**
 * 自定义按钮组件
 */
const CustomButton = ({
    title,
    onPress,
    size = 'medium',
    variant = 'primary',
    disabled = false,
    loading = false,
}) => {
    // 尺寸样式
    const sizeStyles = {
        small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 12 },
        medium: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 14 },
        large: { paddingVertical: 14, paddingHorizontal: 28, fontSize: 16 },
    };

    // 变体颜色
    const variantColors = {
        primary: '#6200EE',
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#F44336',
    };

    const currentSize = sizeStyles[size] || sizeStyles.medium;
    const backgroundColor = disabled ? '#ccc' : (variantColors[variant] || variantColors.primary);

    return (
        <TouchableOpacity
            style={[
                styles.customButton,
                {
                    backgroundColor,
                    paddingVertical: currentSize.paddingVertical,
                    paddingHorizontal: currentSize.paddingHorizontal,
                },
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, { fontSize: currentSize.fontSize }]}>
                {loading ? '⏳' : title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6200EE',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
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
    },
    warning: {
        fontSize: 12,
        color: '#FF5722',
        marginTop: 12,
        backgroundColor: '#FFF3E0',
        padding: 8,
        borderRadius: 4,
    },

    // Button 行
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    spacer: {
        width: 8,
    },

    // TouchableOpacity 按钮
    primaryButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    secondaryButton: {
        backgroundColor: '#E8DEF8',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: '#6200EE',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#6200EE',
        fontSize: 16,
        fontWeight: '600',
    },
    outlineButtonText: {
        color: '#6200EE',
        fontSize: 16,
        fontWeight: '600',
    },

    // TouchableHighlight
    highlightButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },

    // Pressable
    pressableButton: {
        backgroundColor: '#9C27B0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    pressableButtonPressed: {
        backgroundColor: '#7B1FA2',
    },
    scaleButton: {
        backgroundColor: '#FF5722',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    rippleButton: {
        backgroundColor: '#009688',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
    },

    // 自定义按钮
    customButton: {
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        marginHorizontal: 4,
    },
    customButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },

    // 图标按钮
    iconButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF4081',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    iconButtonOutline: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#6200EE',
    },
    iconText: {
        fontSize: 20,
    },
    iconTextDark: {
        fontSize: 20,
        color: '#6200EE',
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

export default ButtonDemo;
