/**
 * FlatListDemo.js - FlatList 组件演示
 * 
 * FlatList 是高性能的列表组件，只渲染可见区域的项。
 * 适用于大量数据的列表展示。
 * 
 * 【学习要点】
 * 1. 基本用法
 * 2. 渲染列表项
 * 3. 下拉刷新
 * 4. 上拉加载更多
 * 5. 列表头尾
 * 6. 空列表
 * 7. 分隔线
 */

import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const FlatListDemo = ({ onBack }) => {
    // 列表数据
    const [data, setData] = useState(generateData(10));

    // 刷新状态
    const [refreshing, setRefreshing] = useState(false);

    // 加载更多状态
    const [loadingMore, setLoadingMore] = useState(false);

    // 是否还有更多数据
    const [hasMore, setHasMore] = useState(true);

    // 生成模拟数据
    function generateData(count, startId = 1) {
        return Array.from({ length: count }, (_, index) => ({
            id: String(startId + index),
            title: `列表项 ${startId + index}`,
            description: `这是第 ${startId + index} 项的描述文字`,
            avatar: `https://i.pravatar.cc/100?img=${(startId + index) % 70}`,
        }));
    }

    // 下拉刷新
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setData(generateData(10));
            setHasMore(true);
            setRefreshing(false);
        }, 1500);
    }, []);

    // 上拉加载更多
    const onLoadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        setTimeout(() => {
            const currentLength = data.length;
            if (currentLength >= 30) {
                setHasMore(false);
            } else {
                setData(prev => [...prev, ...generateData(10, currentLength + 1)]);
            }
            setLoadingMore(false);
        }, 1500);
    }, [data.length, loadingMore, hasMore]);

    /**
     * 渲染列表项
     * renderItem 是 FlatList 最重要的 prop
     * 它接收 { item, index, separators } 参数
     */
    const renderItem = useCallback(({ item, index }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => console.log('点击了:', item.title)}
            activeOpacity={0.7}
        >
            {/* 头像 */}
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.id}</Text>
            </View>

            {/* 内容 */}
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
            </View>

            {/* 箭头 */}
            <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
    ), []);

    /**
     * 列表头部
     */
    const ListHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>📋 FlatList 演示</Text>
            <Text style={styles.headerSubtitle}>
                高性能列表，只渲染可见区域
            </Text>

            <View style={styles.codeBlock}>
                <Text style={styles.code}>
                    {'<FlatList\n  data={data}\n  renderItem={({ item }) => ...}\n  keyExtractor={item => item.id}\n/>'}
                </Text>
            </View>
        </View>
    );

    /**
     * 列表尾部
     */
    const ListFooter = () => {
        if (!hasMore && data.length > 0) {
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>—— 没有更多数据了 ——</Text>
                </View>
            );
        }

        if (loadingMore) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator size="small" color="#6200EE" />
                    <Text style={styles.footerText}>加载中...</Text>
                </View>
            );
        }

        return null;
    };

    /**
     * 空列表
     */
    const ListEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>暂无数据</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={onRefresh}>
                <Text style={styles.emptyButtonText}>刷新试试</Text>
            </TouchableOpacity>
        </View>
    );

    /**
     * 分隔线
     */
    const ItemSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <DemoContainer
            title="FlatList 列表"
            onBack={onBack}
            scrollable={false}
        >
            <FlatList
                // 数据源 - 必须
                data={data}

                // 渲染项 - 必须
                renderItem={renderItem}

                // 唯一标识 - 必须
                keyExtractor={item => item.id}

                // 列表头部
                ListHeaderComponent={ListHeader}

                // 列表尾部
                ListFooterComponent={ListFooter}

                // 空列表
                ListEmptyComponent={ListEmpty}

                // 分隔线
                ItemSeparatorComponent={ItemSeparator}

                // 下拉刷新
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#6200EE']}
                        tintColor="#6200EE"
                    />
                }

                // 上拉加载更多
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.1}  // 距离底部 10% 时触发

                // 性能优化
                initialNumToRender={10}      // 首屏渲染数量
                maxToRenderPerBatch={10}     // 每批渲染数量
                windowSize={5}               // 渲染窗口大小
                removeClippedSubviews={true} // 移除不可见的子视图

                // 样式
                style={styles.list}
                contentContainerStyle={styles.listContent}

                // 显示滚动条
                showsVerticalScrollIndicator={true}
            />
        </DemoContainer>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        flexGrow: 1,
    },

    // 列表头
    header: {
        backgroundColor: '#6200EE',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginTop: 4,
    },
    codeBlock: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        borderRadius: 4,
        marginTop: 12,
    },
    code: {
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: 11,
    },

    // 列表项
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    itemDesc: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    arrow: {
        fontSize: 16,
        color: '#ccc',
    },

    // 分隔线
    separator: {
        height: 8,
    },

    // 列表尾
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    footerText: {
        color: '#888',
        marginLeft: 8,
        fontSize: 14,
    },

    // 空列表
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        marginTop: 12,
    },
    emptyButton: {
        marginTop: 16,
        backgroundColor: '#6200EE',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    emptyButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default FlatListDemo;
