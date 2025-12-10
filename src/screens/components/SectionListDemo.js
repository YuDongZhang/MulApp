/**
 * SectionListDemo.js - SectionList 组件演示
 * 
 * SectionList 用于渲染分组列表，每个分组有一个头部。
 * 类似于 iOS 的 UITableView 分组样式。
 * 
 * 【学习要点】
 * 1. 分组数据结构
 * 2. 渲染分组头
 * 3. 渲染列表项
 * 4. 分组间分隔
 */

import React from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const SectionListDemo = ({ onBack }) => {
    /**
     * SectionList 的数据格式
     * 每个分组是一个对象，包含：
     * - title: 分组标题（可自定义）
     * - data: 该分组的数据数组（必须）
     */
    const DATA = [
        {
            title: '🍎 水果',
            data: [
                { id: '1', name: '苹果', price: '5.00' },
                { id: '2', name: '香蕉', price: '3.50' },
                { id: '3', name: '橙子', price: '4.00' },
                { id: '4', name: '葡萄', price: '8.00' },
            ],
        },
        {
            title: '🥬 蔬菜',
            data: [
                { id: '5', name: '白菜', price: '2.00' },
                { id: '6', name: '西红柿', price: '4.50' },
                { id: '7', name: '黄瓜', price: '3.00' },
            ],
        },
        {
            title: '🥩 肉类',
            data: [
                { id: '8', name: '猪肉', price: '25.00' },
                { id: '9', name: '牛肉', price: '45.00' },
                { id: '10', name: '鸡肉', price: '18.00' },
                { id: '11', name: '鱼肉', price: '22.00' },
            ],
        },
        {
            title: '🥛 乳制品',
            data: [
                { id: '12', name: '牛奶', price: '6.00' },
                { id: '13', name: '酸奶', price: '8.00' },
            ],
        },
    ];

    /**
     * 渲染分组头
     * section 包含完整的分组数据
     */
    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionCount}>{section.data.length}项</Text>
        </View>
    );

    /**
     * 渲染列表项
     */
    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => console.log('点击:', item.name)}
            activeOpacity={0.7}
        >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>¥{item.price}/斤</Text>
        </TouchableOpacity>
    );

    /**
     * 列表头部
     */
    const ListHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>🛒 商品分类</Text>
            <Text style={styles.headerSubtitle}>SectionList 分组列表演示</Text>

            <View style={styles.codeBlock}>
                <Text style={styles.code}>
                    {`// 数据格式
sections={[
  {
    title: "分组标题",
    data: [{ id, name }]  // 必须有 data
  }
]}`}
                </Text>
            </View>
        </View>
    );

    /**
     * 分组间分隔
     */
    const SectionSeparator = () => (
        <View style={styles.sectionSeparator} />
    );

    /**
     * 项间分隔
     */
    const ItemSeparator = () => (
        <View style={styles.itemSeparator} />
    );

    /**
     * 列表尾部
     */
    const ListFooter = () => (
        <View style={styles.footer}>
            <Text style={styles.footerTitle}>📝 SectionList 要点</Text>

            <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>• sections: 分组数据数组</Text>
                <Text style={styles.summaryText}>• renderItem: 渲染列表项</Text>
                <Text style={styles.summaryText}>• renderSectionHeader: 渲染分组头</Text>
                <Text style={styles.summaryText}>• renderSectionFooter: 渲染分组尾</Text>
                <Text style={styles.summaryText}>• keyExtractor: 唯一标识</Text>
                <Text style={styles.summaryText}>• SectionSeparatorComponent: 分组间分隔</Text>
                <Text style={styles.summaryText}>• stickySectionHeadersEnabled: 吸顶效果</Text>
            </View>
        </View>
    );

    return (
        <DemoContainer
            title="SectionList 分组"
            onBack={onBack}
            scrollable={false}
        >
            <SectionList
                // 分组数据 - 必须
                sections={DATA}

                // 渲染列表项 - 必须
                renderItem={renderItem}

                // 渲染分组头 - 可选但常用
                renderSectionHeader={renderSectionHeader}

                // 唯一标识
                keyExtractor={(item) => item.id}

                // 列表头
                ListHeaderComponent={ListHeader}

                // 列表尾
                ListFooterComponent={ListFooter}

                // 分组间分隔
                SectionSeparatorComponent={SectionSeparator}

                // 项间分隔
                ItemSeparatorComponent={ItemSeparator}

                // 分组头吸顶
                stickySectionHeadersEnabled={true}

                // 样式
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
        </DemoContainer>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },

    // 列表头
    header: {
        backgroundColor: '#6200EE',
        padding: 16,
        marginBottom: 8,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
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

    // 分组头
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionCount: {
        fontSize: 12,
        color: '#888',
    },

    // 列表项
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    itemName: {
        fontSize: 15,
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        color: '#F44336',
        fontWeight: '600',
    },

    // 分隔线
    sectionSeparator: {
        height: 8,
        backgroundColor: '#f0f0f0',
    },
    itemSeparator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 16,
    },

    // 列表尾
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 8,
    },
    footerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
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

export default SectionListDemo;
