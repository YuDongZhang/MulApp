/**
 * ScrollViewDemo.js - ScrollView 组件演示
 * 
 * ScrollView 是一个通用的可滚动容器。
 * 适用于内容较少的情况，会一次性渲染所有子组件。
 * 
 * 【学习要点】
 * 1. 基本滚动
 * 2. 水平滚动
 * 3. 下拉刷新
 * 4. 滚动事件
 * 5. 分页效果
 */

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const { width: screenWidth } = Dimensions.get('window');

const ScrollViewDemo = ({ onBack }) => {
    // 下拉刷新状态
    const [refreshing, setRefreshing] = useState(false);

    // 滚动位置
    const [scrollY, setScrollY] = useState(0);

    // 滚动视图 ref
    const scrollViewRef = useRef(null);

    // 模拟刷新
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    // 滚动到顶部
    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    // 生成演示数据
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

    return (
        <DemoContainer
            title="ScrollView 滚动"
            onBack={onBack}
            scrollable={false}
        >
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                // 下拉刷新控件
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#6200EE']}  // Android
                        tintColor="#6200EE"   // iOS
                        title="下拉刷新..."   // iOS
                    />
                }
                // 滚动事件
                onScroll={(event) => {
                    const y = event.nativeEvent.contentOffset.y;
                    setScrollY(Math.round(y));
                }}
                scrollEventThrottle={16}  // 滚动事件触发频率
                // 显示滚动条
                showsVerticalScrollIndicator={true}
            >
                {/* 滚动位置指示器 */}
                <View style={styles.indicator}>
                    <Text style={styles.indicatorText}>滚动位置: {scrollY}px</Text>
                    <TouchableOpacity style={styles.topButton} onPress={scrollToTop}>
                        <Text style={styles.topButtonText}>回到顶部</Text>
                    </TouchableOpacity>
                </View>

                {/* 1. 基本垂直滚动 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. 垂直滚动（默认）</Text>
                    <Text style={styles.tip}>下拉可刷新 ↓</Text>

                    {colors.map((color, index) => (
                        <View
                            key={index}
                            style={[styles.colorBlock, { backgroundColor: color }]}
                        >
                            <Text style={styles.blockText}>区块 {index + 1}</Text>
                        </View>
                    ))}
                </View>

                {/* 2. 水平滚动 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. 水平滚动</Text>
                    <Text style={styles.code}>
                        {'horizontal={true}'}
                    </Text>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalContent}
                    >
                        {colors.map((color, index) => (
                            <View
                                key={index}
                                style={[styles.horizontalBlock, { backgroundColor: color }]}
                            >
                                <Text style={styles.blockText}>{index + 1}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 3. 分页效果 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. 分页效果</Text>
                    <Text style={styles.code}>
                        {'pagingEnabled={true}'}
                    </Text>

                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}  // 启用分页
                        showsHorizontalScrollIndicator={false}
                        style={styles.pagingScrollView}
                    >
                        {colors.slice(0, 3).map((color, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.pageBlock,
                                    { backgroundColor: color, width: screenWidth - 64 }
                                ]}
                            >
                                <Text style={styles.pageText}>页面 {index + 1}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <Text style={styles.tip}>← 左右滑动切换页面 →</Text>
                </View>

                {/* 4. 嵌套 ScrollView */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. ScrollView 属性</Text>

                    <View style={styles.propsList}>
                        <PropItem name="horizontal" desc="是否水平滚动" />
                        <PropItem name="pagingEnabled" desc="是否启用分页" />
                        <PropItem name="showsVerticalScrollIndicator" desc="显示垂直滚动条" />
                        <PropItem name="showsHorizontalScrollIndicator" desc="显示水平滚动条" />
                        <PropItem name="bounces" desc="iOS 弹性效果" />
                        <PropItem name="scrollEnabled" desc="是否可滚动" />
                        <PropItem name="onScroll" desc="滚动时回调" />
                        <PropItem name="onScrollBeginDrag" desc="开始拖拽" />
                        <PropItem name="onScrollEndDrag" desc="结束拖拽" />
                        <PropItem name="onMomentumScrollEnd" desc="惯性滚动结束" />
                    </View>
                </View>

                {/* 5. 方法 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. 常用方法</Text>

                    <View style={styles.methodsBox}>
                        <Text style={styles.methodText}>• scrollTo({'{ x, y, animated }'})</Text>
                        <Text style={styles.methodText}>• scrollToEnd({'{ animated }'})</Text>
                        <Text style={styles.methodText}>• flashScrollIndicators()</Text>
                    </View>
                </View>

                {/* 总结 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📝 总结</Text>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>• ScrollView 一次渲染所有内容</Text>
                        <Text style={styles.summaryText}>• 适合内容较少的情况</Text>
                        <Text style={styles.summaryText}>• 大量数据请使用 FlatList</Text>
                        <Text style={styles.summaryText}>• RefreshControl 实现下拉刷新</Text>
                    </View>
                </View>

                <View style={{ height: 50 }} />
            </ScrollView>
        </DemoContainer>
    );
};

/**
 * 属性项组件
 */
const PropItem = ({ name, desc }) => (
    <View style={styles.propItem}>
        <Text style={styles.propName}>{name}</Text>
        <Text style={styles.propDesc}>{desc}</Text>
    </View>
);

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContent: {
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
        marginBottom: 8,
        textAlign: 'center',
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

    // 指示器
    indicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6200EE',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    indicatorText: {
        color: '#fff',
        fontSize: 14,
    },
    topButton: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    topButtonText: {
        color: '#6200EE',
        fontSize: 12,
        fontWeight: '600',
    },

    // 颜色块
    colorBlock: {
        height: 60,
        borderRadius: 8,
        marginVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // 水平滚动
    horizontalContent: {
        paddingVertical: 8,
    },
    horizontalBlock: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 分页
    pagingScrollView: {
        height: 120,
    },
    pageBlock: {
        height: 120,
        borderRadius: 8,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    // 属性列表
    propsList: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
    },
    propItem: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    propName: {
        fontFamily: 'monospace',
        color: '#6200EE',
        fontSize: 12,
        width: 180,
    },
    propDesc: {
        color: '#666',
        fontSize: 12,
        flex: 1,
    },

    // 方法
    methodsBox: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    methodText: {
        fontFamily: 'monospace',
        color: '#333',
        fontSize: 12,
        marginVertical: 2,
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

export default ScrollViewDemo;
