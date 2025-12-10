/**
 * FlexboxDemo.js - Flexbox 布局演示
 * 
 * React Native 使用 Flexbox 进行布局，与 Web 上的 Flexbox 类似。
 * 默认 flexDirection 是 column（垂直）而不是 row。
 * 
 * 【学习要点】
 * 1. flexDirection - 主轴方向
 * 2. justifyContent - 主轴对齐
 * 3. alignItems - 交叉轴对齐
 * 4. flex - 弹性伸缩
 * 5. flexWrap - 换行
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const FlexboxDemo = ({ onBack }) => {
    const [flexDirection, setFlexDirection] = useState('column');
    const [justifyContent, setJustifyContent] = useState('flex-start');
    const [alignItems, setAlignItems] = useState('stretch');

    // 选项
    const directions = ['column', 'row', 'column-reverse', 'row-reverse'];
    const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
    const alignOptions = ['flex-start', 'center', 'flex-end', 'stretch'];

    return (
        <DemoContainer
            title="Flexbox 布局"
            onBack={onBack}
            scrollable={false}
        >
            <ScrollView style={styles.scrollView}>
                {/* 1. flexDirection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. flexDirection（主轴方向）</Text>

                    <View style={styles.optionRow}>
                        {directions.map(dir => (
                            <TouchableOpacity
                                key={dir}
                                style={[
                                    styles.optionButton,
                                    flexDirection === dir && styles.optionButtonActive,
                                ]}
                                onPress={() => setFlexDirection(dir)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    flexDirection === dir && styles.optionTextActive,
                                ]}>
                                    {dir}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={[styles.demoContainer, { flexDirection }]}>
                        {[1, 2, 3].map(n => (
                            <View key={n} style={styles.box}>
                                <Text style={styles.boxText}>{n}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.tip}>
                        💡 RN 默认是 column（垂直），Web 默认是 row（水平）
                    </Text>
                </View>

                {/* 2. justifyContent */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. justifyContent（主轴对齐）</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.optionRow}>
                            {justifyOptions.map(opt => (
                                <TouchableOpacity
                                    key={opt}
                                    style={[
                                        styles.optionButton,
                                        justifyContent === opt && styles.optionButtonActive,
                                    ]}
                                    onPress={() => setJustifyContent(opt)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        justifyContent === opt && styles.optionTextActive,
                                    ]}>
                                        {opt.replace('flex-', '').replace('space-', 's-')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={[
                        styles.demoContainer,
                        styles.tallContainer,
                        { justifyContent }
                    ]}>
                        {[1, 2, 3].map(n => (
                            <View key={n} style={styles.smallBox}>
                                <Text style={styles.boxText}>{n}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 3. alignItems */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. alignItems（交叉轴对齐）</Text>

                    <View style={styles.optionRow}>
                        {alignOptions.map(opt => (
                            <TouchableOpacity
                                key={opt}
                                style={[
                                    styles.optionButton,
                                    alignItems === opt && styles.optionButtonActive,
                                ]}
                                onPress={() => setAlignItems(opt)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    alignItems === opt && styles.optionTextActive,
                                ]}>
                                    {opt.replace('flex-', '')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={[styles.demoContainer, { alignItems }]}>
                        <View style={[styles.varBox, { height: 30 }]}>
                            <Text style={styles.boxText}>1</Text>
                        </View>
                        <View style={[styles.varBox, { height: 50 }]}>
                            <Text style={styles.boxText}>2</Text>
                        </View>
                        <View style={[styles.varBox, { height: 40 }]}>
                            <Text style={styles.boxText}>3</Text>
                        </View>
                    </View>
                </View>

                {/* 4. flex */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. flex（弹性伸缩）</Text>

                    <Text style={styles.label}>flex: 1, 2, 1 的比例分配：</Text>
                    <View style={styles.flexContainer}>
                        <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
                            <Text style={styles.boxText}>1</Text>
                        </View>
                        <View style={[styles.flexBox, { flex: 2, backgroundColor: '#4ECDC4' }]}>
                            <Text style={styles.boxText}>2</Text>
                        </View>
                        <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
                            <Text style={styles.boxText}>1</Text>
                        </View>
                    </View>

                    <Text style={styles.label}>固定宽度 + flex: 1：</Text>
                    <View style={styles.flexContainer}>
                        <View style={[styles.flexBox, { width: 80, backgroundColor: '#FF6B6B' }]}>
                            <Text style={styles.boxText}>80</Text>
                        </View>
                        <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
                            <Text style={styles.boxText}>flex:1</Text>
                        </View>
                    </View>
                </View>

                {/* 5. flexWrap */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. flexWrap（换行）</Text>

                    <Text style={styles.label}>wrap（自动换行）：</Text>
                    <View style={styles.wrapContainer}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <View key={n} style={styles.wrapBox}>
                                <Text style={styles.boxText}>{n}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.code}>
                        {'flexWrap: "wrap"'}
                    </Text>
                </View>

                {/* 6. 实战示例 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>6. 实战示例</Text>

                    <Text style={styles.label}>头像 + 信息布局：</Text>
                    <View style={styles.profileCard}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>👤</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>张三</Text>
                            <Text style={styles.profileDesc}>前端开发工程师</Text>
                        </View>
                        <View style={styles.followButton}>
                            <Text style={styles.followText}>关注</Text>
                        </View>
                    </View>

                    <Text style={styles.label}>底部导航栏：</Text>
                    <View style={styles.tabBar}>
                        {['🏠', '🔍', '➕', '❤️', '👤'].map((icon, i) => (
                            <TouchableOpacity key={i} style={styles.tabItem}>
                                <Text style={styles.tabIcon}>{icon}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 总结 */}
                <View style={[styles.section, { marginBottom: 30 }]}>
                    <Text style={styles.sectionTitle}>📝 Flexbox 总结</Text>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>• flexDirection: 主轴方向(column/row)</Text>
                        <Text style={styles.summaryText}>• justifyContent: 主轴对齐方式</Text>
                        <Text style={styles.summaryText}>• alignItems: 交叉轴对齐方式</Text>
                        <Text style={styles.summaryText}>• flex: 弹性伸缩比例</Text>
                        <Text style={styles.summaryText}>• flexWrap: 是否换行</Text>
                        <Text style={styles.summaryText}>• alignSelf: 单独设置交叉轴对齐</Text>
                    </View>
                </View>
            </ScrollView>
        </DemoContainer>
    );
};

const styles = StyleSheet.create({
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
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 12,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
        color: '#E91E63',
    },
    label: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
        marginTop: 8,
    },

    // 选项按钮
    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    optionButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
        marginBottom: 8,
    },
    optionButtonActive: {
        backgroundColor: '#6200EE',
    },
    optionText: {
        fontSize: 11,
        color: '#666',
    },
    optionTextActive: {
        color: '#fff',
    },

    // 演示容器
    demoContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 8,
        minHeight: 80,
    },
    tallContainer: {
        height: 150,
    },

    // 盒子
    box: {
        width: 50,
        height: 50,
        backgroundColor: '#6200EE',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
    smallBox: {
        width: 40,
        height: 40,
        backgroundColor: '#6200EE',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    varBox: {
        width: 50,
        backgroundColor: '#6200EE',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
    boxText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },

    // Flex 演示
    flexContainer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 8,
    },
    flexBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Wrap 演示
    wrapContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 8,
    },
    wrapBox: {
        width: 60,
        height: 40,
        backgroundColor: '#9C27B0',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },

    // 实战示例
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 24,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 12,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    profileDesc: {
        color: '#888',
        fontSize: 12,
    },
    followButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    followText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabIcon: {
        fontSize: 20,
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

export default FlexboxDemo;
