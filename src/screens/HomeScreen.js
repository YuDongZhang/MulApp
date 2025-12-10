/**
 * HomeScreen.js - 首页/学习模块列表
 * 
 * 这是应用的主页面，展示所有可用的学习模块。
 * 点击任意模块可以进入对应的演示页面。
 * 
 * 【学习要点】
 * 1. FlatList 组件的使用
 * 2. 数组数据渲染
 * 3. 导航传参
 * 4. 样式组织
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';

/**
 * 学习模块数据
 * 每个对象包含：
 * - id: 唯一标识符
 * - title: 显示标题
 * - screen: 对应的屏幕名称（用于导航）
 * - category: 分类
 * - description: 简短描述
 */
const DEMO_LIST = [
    // ===== 第一部分：核心概念 =====
    {
        id: '1',
        title: 'JSX 语法',
        screen: 'JSXDemo',
        category: '核心概念',
        description: '学习 JSX 语法基础',
    },
    {
        id: '2',
        title: 'Props 属性',
        screen: 'PropsDemo',
        category: '核心概念',
        description: '组件间数据传递',
    },
    {
        id: '3',
        title: 'State 状态',
        screen: 'StateDemo',
        category: '核心概念',
        description: '组件内部状态管理',
    },
    {
        id: '4',
        title: '事件处理',
        screen: 'EventDemo',
        category: '核心概念',
        description: '用户交互响应',
    },

    // ===== 第二部分：核心组件 =====
    {
        id: '5',
        title: 'View 和 Text',
        screen: 'ViewTextDemo',
        category: '核心组件',
        description: '基础容器和文本组件',
    },
    {
        id: '6',
        title: 'Image 图片',
        screen: 'ImageDemo',
        category: '核心组件',
        description: '图片展示组件',
    },
    {
        id: '7',
        title: 'TextInput 输入框',
        screen: 'TextInputDemo',
        category: '核心组件',
        description: '文本输入组件',
    },
    {
        id: '8',
        title: 'Button 按钮',
        screen: 'ButtonDemo',
        category: '核心组件',
        description: '按钮和触摸组件',
    },
    {
        id: '9',
        title: 'ScrollView 滚动',
        screen: 'ScrollViewDemo',
        category: '核心组件',
        description: '滚动视图组件',
    },
    {
        id: '10',
        title: 'FlatList 列表',
        screen: 'FlatListDemo',
        category: '核心组件',
        description: '高性能列表组件',
    },
    {
        id: '11',
        title: 'SectionList 分组',
        screen: 'SectionListDemo',
        category: '核心组件',
        description: '分组列表组件',
    },

    // ===== 第三部分：样式和布局 =====
    {
        id: '12',
        title: 'StyleSheet 样式',
        screen: 'StyleSheetDemo',
        category: '样式布局',
        description: '样式表使用方法',
    },
    {
        id: '13',
        title: 'Flexbox 布局',
        screen: 'FlexboxDemo',
        category: '样式布局',
        description: '弹性盒子布局',
    },

    // ===== 第四部分：平台 API =====
    {
        id: '14',
        title: 'Alert 弹窗',
        screen: 'AlertDemo',
        category: '平台 API',
        description: '警告/确认弹窗',
    },
    {
        id: '15',
        title: 'Modal 模态框',
        screen: 'ModalDemo',
        category: '平台 API',
        description: '模态框组件',
    },
    {
        id: '16',
        title: 'StatusBar 状态栏',
        screen: 'StatusBarDemo',
        category: '平台 API',
        description: '状态栏控制',
    },
    {
        id: '17',
        title: 'ActivityIndicator',
        screen: 'ActivityIndicatorDemo',
        category: '平台 API',
        description: '加载指示器',
    },
    {
        id: '18',
        title: 'Switch 开关',
        screen: 'SwitchDemo',
        category: '平台 API',
        description: '开关组件',
    },
    {
        id: '19',
        title: 'Platform 平台',
        screen: 'PlatformDemo',
        category: '平台 API',
        description: '平台检测 API',
    },
];

/**
 * HomeScreen 组件
 * 
 * @param {function} onNavigate - 导航函数，用于跳转到子页面
 */
const HomeScreen = ({ onNavigate }) => {
    /**
     * 渲染列表项
     * 这是 FlatList 的 renderItem 回调函数
     * 
     * @param {object} param0 - 包含 item 和 index 的对象
     */
    const renderItem = ({ item, index }) => {
        // 判断是否是新分类的第一项（用于显示分类标题）
        const isFirstInCategory =
            index === 0 ||
            DEMO_LIST[index - 1].category !== item.category;

        return (
            <View>
                {/* 分类标题 - 只在新分类的第一项显示 */}
                {isFirstInCategory && (
                    <View style={styles.categoryHeader}>
                        <Text style={styles.categoryTitle}>{item.category}</Text>
                    </View>
                )}

                {/* 列表项卡片 */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => onNavigate(item.screen)}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardContent}>
                        {/* 序号 */}
                        <View style={styles.numberBadge}>
                            <Text style={styles.numberText}>{item.id}</Text>
                        </View>

                        {/* 标题和描述 */}
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                        </View>

                        {/* 箭头图标 */}
                        <Text style={styles.arrow}>→</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 设置状态栏样式 */}
            <StatusBar barStyle="light-content" backgroundColor="#6200EE" />

            {/* 顶部标题 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>React Native 学习</Text>
                <Text style={styles.headerSubtitle}>官方文档核心概念演示</Text>
            </View>

            {/* 学习模块列表 */}
            <FlatList
                data={DEMO_LIST}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                // 显示滚动条
                showsVerticalScrollIndicator={true}
            />
        </SafeAreaView>
    );
};

/**
 * 样式定义
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },

    // 顶部标题区域
    header: {
        backgroundColor: '#6200EE',
        paddingVertical: 20,
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        marginTop: 4,
    },

    // 列表内容
    listContent: {
        padding: 12,
        paddingBottom: 24,
    },

    // 分类标题
    categoryHeader: {
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200EE',
    },

    // 卡片样式
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },

    // 序号徽章
    numberBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    numberText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },

    // 文本容器
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    // 箭头
    arrow: {
        fontSize: 18,
        color: '#999',
        marginLeft: 8,
    },
});

export default HomeScreen;
