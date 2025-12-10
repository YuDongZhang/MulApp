/**
 * ActivityIndicatorDemo.js - 加载指示器演示
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const ActivityIndicatorDemo = ({ onBack }) => {
    const [loading, setLoading] = useState(false);

    // 模拟加载
    const simulateLoading = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <DemoContainer title="ActivityIndicator" onBack={onBack}>
            {/* 1. 基本使用 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. 基本使用</Text>

                <View style={styles.indicatorRow}>
                    <View style={styles.indicatorItem}>
                        <ActivityIndicator />
                        <Text style={styles.indicatorLabel}>默认</Text>
                    </View>

                    <View style={styles.indicatorItem}>
                        <ActivityIndicator size="large" />
                        <Text style={styles.indicatorLabel}>大号</Text>
                    </View>

                    <View style={styles.indicatorItem}>
                        <ActivityIndicator size="small" />
                        <Text style={styles.indicatorLabel}>小号</Text>
                    </View>
                </View>
            </View>

            {/* 2. 颜色 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. 自定义颜色</Text>

                <View style={styles.indicatorRow}>
                    <View style={styles.indicatorItem}>
                        <ActivityIndicator size="large" color="#6200EE" />
                        <Text style={styles.indicatorLabel}>紫色</Text>
                    </View>

                    <View style={styles.indicatorItem}>
                        <ActivityIndicator size="large" color="#F44336" />
                        <Text style={styles.indicatorLabel}>红色</Text>
                    </View>

                    <View style={styles.indicatorItem}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                        <Text style={styles.indicatorLabel}>绿色</Text>
                    </View>

                    <View style={styles.indicatorItem}>
                        <ActivityIndicator size="large" color="#FF9800" />
                        <Text style={styles.indicatorLabel}>橙色</Text>
                    </View>
                </View>
            </View>

            {/* 3. 实际应用 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 实际应用</Text>

                {/* 加载按钮 */}
                <TouchableOpacity
                    style={styles.loadingButton}
                    onPress={simulateLoading}
                    disabled={loading}
                >
                    {loading ? (
                        <View style={styles.loadingContent}>
                            <ActivityIndicator size="small" color="#fff" />
                            <Text style={styles.loadingButtonText}>加载中...</Text>
                        </View>
                    ) : (
                        <Text style={styles.loadingButtonText}>点击加载</Text>
                    )}
                </TouchableOpacity>

                {/* 加载遮罩 */}
                <View style={styles.loadingOverlayDemo}>
                    <Text style={styles.overlayText}>内容区域</Text>

                    {loading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#6200EE" />
                            <Text style={styles.loadingText}>正在加载...</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* 4. 条件渲染 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. 条件渲染</Text>

                <View style={styles.codeBlock}>
                    <Text style={styles.code}>
                        {`{loading ? (
  <ActivityIndicator size="large" />
) : (
  <内容组件 />
)}`}
                    </Text>
                </View>
            </View>

            {/* 属性 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>常用属性</Text>
                <View style={styles.propsList}>
                    <PropItem name="size" desc="尺寸: 'small' | 'large' | 数字" />
                    <PropItem name="color" desc="颜色" />
                    <PropItem name="animating" desc="是否动画 (默认 true)" />
                    <PropItem name="hidesWhenStopped" desc="停止时是否隐藏 (iOS)" />
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

    // 指示器展示
    indicatorRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    indicatorItem: {
        alignItems: 'center',
    },
    indicatorLabel: {
        marginTop: 8,
        fontSize: 12,
        color: '#666',
    },

    // 加载按钮
    loadingButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingButtonText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 8,
    },

    // 加载遮罩演示
    loadingOverlayDemo: {
        height: 150,
        backgroundColor: '#E3F2FD',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlayText: {
        fontSize: 18,
        color: '#1565C0',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    loadingText: {
        marginTop: 12,
        color: '#666',
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
        width: 130,
    },
    propDesc: {
        color: '#666',
        flex: 1,
    },
});

export default ActivityIndicatorDemo;
