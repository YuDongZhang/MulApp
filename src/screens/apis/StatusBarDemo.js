/**
 * StatusBarDemo.js - StatusBar 状态栏演示
 * ActivityIndicatorDemo.js - ActivityIndicator 加载指示器演示
 * SwitchDemo.js - Switch 开关演示
 * PlatformDemo.js - Platform 平台检测演示
 * 
 * 合并为一个文件减少文件数量
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const StatusBarDemo = ({ onBack }) => {
    const [barStyle, setBarStyle] = useState('default');
    const [bgColor, setBgColor] = useState('#6200EE');
    const [hidden, setHidden] = useState(false);

    const barStyles = ['default', 'light-content', 'dark-content'];
    const colors = ['#6200EE', '#F44336', '#4CAF50', '#2196F3', '#FF9800'];

    return (
        <DemoContainer title="StatusBar 状态栏" onBack={onBack}>
            {/* 状态栏组件 */}
            <StatusBar
                barStyle={barStyle}
                backgroundColor={bgColor}
                hidden={hidden}
                animated={true}
            />

            {/* 1. barStyle */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. barStyle（文字颜色）</Text>

                <View style={styles.optionRow}>
                    {barStyles.map(style => (
                        <TouchableOpacity
                            key={style}
                            style={[
                                styles.optionBtn,
                                barStyle === style && styles.optionBtnActive,
                            ]}
                            onPress={() => setBarStyle(style)}
                        >
                            <Text style={[
                                styles.optionText,
                                barStyle === style && styles.optionTextActive,
                            ]}>
                                {style}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.tip}>
                    default: 自动 | light-content: 白色 | dark-content: 黑色
                </Text>
            </View>

            {/* 2. backgroundColor */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. backgroundColor（背景色）</Text>
                <Text style={styles.tip}>仅 Android 支持</Text>

                <View style={styles.colorRow}>
                    {colors.map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.colorBtn,
                                { backgroundColor: color },
                                bgColor === color && styles.colorBtnActive,
                            ]}
                            onPress={() => setBgColor(color)}
                        />
                    ))}
                </View>
            </View>

            {/* 3. hidden */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. hidden（隐藏状态栏）</Text>

                <TouchableOpacity
                    style={[styles.toggleBtn, hidden && styles.toggleBtnActive]}
                    onPress={() => setHidden(!hidden)}
                >
                    <Text style={styles.toggleBtnText}>
                        {hidden ? '点击显示状态栏' : '点击隐藏状态栏'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 代码 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>代码示例</Text>
                <View style={styles.codeBlock}>
                    <Text style={styles.code}>
                        {`<StatusBar
  barStyle="${barStyle}"
  backgroundColor="${bgColor}"
  hidden={${hidden}}
  animated={true}
/>`}
                    </Text>
                </View>
            </View>

            {/* 常用属性 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>常用属性</Text>
                <View style={styles.propsList}>
                    <PropItem name="barStyle" desc="文字颜色样式" />
                    <PropItem name="backgroundColor" desc="背景色 (Android)" />
                    <PropItem name="hidden" desc="是否隐藏" />
                    <PropItem name="animated" desc="更改时是否动画" />
                    <PropItem name="translucent" desc="是否半透明 (Android)" />
                </View>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• StatusBar 控制系统状态栏样式</Text>
                    <Text style={styles.summaryText}>• barStyle: 文字颜色</Text>
                    <Text style={styles.summaryText}>• backgroundColor: 仅 Android</Text>
                    <Text style={styles.summaryText}>• 可以使用组件或静态方法</Text>
                </View>
            </View>
        </DemoContainer>
    );
};

const PropItem = ({ name, desc }) => (
    <View style={styles.propItem}>
        <Text style={styles.propName}>{name}</Text>
        <Text style={styles.propDesc}>{desc}</Text>
    </View>
);

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
    },

    // 选项
    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    optionBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
        marginBottom: 8,
    },
    optionBtnActive: {
        backgroundColor: '#6200EE',
    },
    optionText: {
        fontSize: 12,
        color: '#666',
    },
    optionTextActive: {
        color: '#fff',
    },

    // 颜色选项
    colorRow: {
        flexDirection: 'row',
    },
    colorBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    colorBtnActive: {
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },

    // 切换按钮
    toggleBtn: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    toggleBtnActive: {
        backgroundColor: '#6200EE',
    },
    toggleBtnText: {
        fontWeight: '600',
        color: '#333',
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

    // 属性列表
    propsList: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    propItem: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    propName: {
        fontFamily: 'monospace',
        color: '#E91E63',
        width: 140,
    },
    propDesc: {
        color: '#666',
        flex: 1,
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

export default StatusBarDemo;
