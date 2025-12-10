/**
 * StyleSheetDemo.js - StyleSheet 样式演示
 * 
 * StyleSheet 是 React Native 中创建样式的推荐方式。
 * 它将样式从组件中分离，并进行优化。
 * 
 * 【学习要点】
 * 1. StyleSheet.create 创建样式
 * 2. 内联样式 vs StyleSheet
 * 3. 样式组合
 * 4. 动态样式
 * 5. 绝对定位
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const StyleSheetDemo = ({ onBack }) => {
    const [isActive, setIsActive] = useState(false);
    const [size, setSize] = useState('medium');

    return (
        <DemoContainer title="StyleSheet 样式" onBack={onBack}>
            {/* 1. 基本使用 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. StyleSheet.create</Text>

                <Text style={styles.code}>
                    {`const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});`}
                </Text>

                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>使用 StyleSheet 创建的样式</Text>
                </View>

                <Text style={styles.tip}>
                    💡 StyleSheet.create 会验证样式并进行性能优化
                </Text>
            </View>

            {/* 2. 内联样式 vs StyleSheet */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. 内联 vs StyleSheet</Text>

                {/* 内联样式 - 每次渲染都会创建新对象 */}
                <View style={{
                    backgroundColor: '#FF6B6B',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                }}>
                    <Text style={{ color: '#fff' }}>内联样式（不推荐）</Text>
                </View>

                {/* StyleSheet - 只创建一次 */}
                <View style={styles.styleSheetBox}>
                    <Text style={styles.styleSheetText}>StyleSheet（推荐）</Text>
                </View>

                <View style={styles.comparisonBox}>
                    <Text style={styles.comparisonTitle}>区别：</Text>
                    <Text style={styles.comparisonText}>• 内联样式每次渲染都会创建新对象</Text>
                    <Text style={styles.comparisonText}>• StyleSheet 只创建一次，有缓存</Text>
                    <Text style={styles.comparisonText}>• StyleSheet 会验证样式属性名</Text>
                </View>
            </View>

            {/* 3. 样式组合 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 样式组合</Text>

                {/* 使用数组组合多个样式 */}
                <View style={[styles.baseBox, styles.primaryBox]}>
                    <Text style={styles.boxText}>组合样式 1</Text>
                </View>

                <View style={[styles.baseBox, styles.successBox]}>
                    <Text style={styles.boxText}>组合样式 2</Text>
                </View>

                {/* 组合 + 内联覆盖 */}
                <View style={[styles.baseBox, styles.primaryBox, { borderWidth: 3 }]}>
                    <Text style={styles.boxText}>组合 + 内联覆盖</Text>
                </View>

                <Text style={styles.code}>
                    {'style={[styles.base, styles.primary, { ... }]}'}
                </Text>
            </View>

            {/* 4. 动态样式 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. 动态样式</Text>

                <TouchableOpacity
                    style={[
                        styles.dynamicBox,
                        isActive && styles.dynamicBoxActive,
                    ]}
                    onPress={() => setIsActive(!isActive)}
                >
                    <Text style={[
                        styles.dynamicText,
                        isActive && styles.dynamicTextActive,
                    ]}>
                        {isActive ? '激活状态' : '点击激活'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.sizeButtons}>
                    {['small', 'medium', 'large'].map(s => (
                        <TouchableOpacity
                            key={s}
                            style={[
                                styles.sizeButton,
                                size === s && styles.sizeButtonActive,
                            ]}
                            onPress={() => setSize(s)}
                        >
                            <Text style={[
                                styles.sizeButtonText,
                                size === s && styles.sizeButtonTextActive,
                            ]}>
                                {s}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={[styles.sizePreview, sizeStyles[size]]}>
                    <Text style={styles.boxText}>{size}</Text>
                </View>
            </View>

            {/* 5. 常用样式属性 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. 常用样式属性</Text>

                <View style={styles.propsContainer}>
                    <PropCategory title="尺寸" items={[
                        'width, height',
                        'minWidth, maxWidth',
                        'minHeight, maxHeight',
                    ]} />

                    <PropCategory title="边距" items={[
                        'margin, padding',
                        'marginTop, paddingTop...',
                        'marginVertical, paddingHorizontal',
                    ]} />

                    <PropCategory title="边框" items={[
                        'borderWidth, borderColor',
                        'borderRadius',
                        'borderTopWidth...',
                    ]} />

                    <PropCategory title="背景" items={[
                        'backgroundColor',
                        'opacity',
                    ]} />

                    <PropCategory title="文本" items={[
                        'color, fontSize',
                        'fontWeight, fontStyle',
                        'textAlign, lineHeight',
                    ]} />
                </View>
            </View>

            {/* 6. 绝对定位 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>6. 绝对定位</Text>

                <View style={styles.positionContainer}>
                    <View style={styles.positionBox}>
                        <Text style={styles.boxText}>relative (默认)</Text>
                    </View>

                    <View style={styles.absoluteBox}>
                        <Text style={styles.absoluteText}>absolute</Text>
                    </View>
                </View>

                <Text style={styles.code}>
                    {'position: "absolute", top: 10, right: 10'}
                </Text>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• 使用 StyleSheet.create 创建样式</Text>
                    <Text style={styles.summaryText}>• 使用数组组合多个样式</Text>
                    <Text style={styles.summaryText}>• 后面的样式会覆盖前面的</Text>
                    <Text style={styles.summaryText}>• 动态样式使用条件表达式</Text>
                    <Text style={styles.summaryText}>• 避免在 render 中创建样式对象</Text>
                </View>
            </View>
        </DemoContainer>
    );
};

/**
 * 属性分类组件
 */
const PropCategory = ({ title, items }) => (
    <View style={styles.propCategory}>
        <Text style={styles.propTitle}>{title}</Text>
        {items.map((item, i) => (
            <Text key={i} style={styles.propItem}>• {item}</Text>
        ))}
    </View>
);

// 动态尺寸样式
const sizeStyles = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 180, height: 80 },
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
        marginTop: 8,
        fontStyle: 'italic',
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 11,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
        marginTop: 12,
        color: '#333',
    },

    // 演示盒子
    demoBox: {
        backgroundColor: '#6200EE',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    demoText: {
        color: '#fff',
        fontWeight: '600',
    },

    // 内联 vs StyleSheet
    styleSheetBox: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
    },
    styleSheetText: {
        color: '#fff',
    },
    comparisonBox: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
    },
    comparisonTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    comparisonText: {
        fontSize: 12,
        color: '#666',
        marginVertical: 2,
    },

    // 样式组合
    baseBox: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        borderWidth: 0,
        borderColor: '#fff',
    },
    primaryBox: {
        backgroundColor: '#6200EE',
    },
    successBox: {
        backgroundColor: '#4CAF50',
    },
    boxText: {
        color: '#fff',
        fontWeight: '600',
    },

    // 动态样式
    dynamicBox: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        marginBottom: 12,
    },
    dynamicBoxActive: {
        backgroundColor: '#6200EE',
    },
    dynamicText: {
        color: '#666',
        fontWeight: '600',
    },
    dynamicTextActive: {
        color: '#fff',
    },
    sizeButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    sizeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    sizeButtonActive: {
        backgroundColor: '#6200EE',
    },
    sizeButtonText: {
        color: '#666',
    },
    sizeButtonTextActive: {
        color: '#fff',
    },
    sizePreview: {
        backgroundColor: '#03DAC6',
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 属性列表
    propsContainer: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    propCategory: {
        marginBottom: 12,
    },
    propTitle: {
        fontWeight: 'bold',
        color: '#6200EE',
        marginBottom: 4,
    },
    propItem: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
    },

    // 绝对定位
    positionContainer: {
        height: 100,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        position: 'relative',
    },
    positionBox: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 4,
        position: 'relative',
    },
    absoluteBox: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#F44336',
        padding: 8,
        borderRadius: 4,
    },
    absoluteText: {
        color: '#fff',
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

export default StyleSheetDemo;
