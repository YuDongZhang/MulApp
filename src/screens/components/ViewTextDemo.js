/**
 * ViewTextDemo.js - View 和 Text 组件演示
 * 
 * View 是最基础的 UI 构建块，类似于 HTML 的 div。
 * Text 用于显示文本，所有文本必须放在 Text 组件内。
 * 
 * 【学习要点】
 * 1. View 的基本用法和样式
 * 2. Text 的基本用法和样式
 * 3. 嵌套 View 和 Text
 * 4. Text 的特殊属性
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const ViewTextDemo = ({ onBack }) => {
    return (
        <DemoContainer title="View 和 Text" onBack={onBack}>
            {/* 1. View 基础 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. View - 基础容器</Text>

                {/* View 是一个容器，用于包装其他组件 */}
                <View style={styles.basicView}>
                    <Text style={styles.viewText}>这是一个 View 容器</Text>
                </View>

                {/* View 可以设置背景、边框、圆角等 */}
                <View style={styles.styledView}>
                    <Text style={styles.viewText}>带样式的 View</Text>
                </View>

                <Text style={styles.code}>
                    {'View 相当于 HTML 的 <div>'}
                </Text>
            </View>

            {/* 2. View 嵌套 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. View 嵌套</Text>

                <View style={styles.outerView}>
                    <Text style={styles.labelText}>外层 View</Text>

                    <View style={styles.innerView}>
                        <Text style={styles.labelText}>内层 View 1</Text>
                    </View>

                    <View style={styles.innerView2}>
                        <Text style={styles.labelText}>内层 View 2</Text>
                    </View>
                </View>
            </View>

            {/* 3. Text 基础 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. Text - 文本组件</Text>

                {/* 基本文本 */}
                <Text>这是默认样式的文本</Text>

                {/* 带样式的文本 */}
                <Text style={styles.largeText}>大号文字</Text>
                <Text style={styles.coloredText}>彩色文字</Text>
                <Text style={styles.boldText}>加粗文字</Text>
                <Text style={styles.italicText}>斜体文字</Text>

                <Text style={styles.warning}>
                    ⚠️ 所有文本必须放在 Text 组件内！
                </Text>
            </View>

            {/* 4. Text 嵌套 - 实现富文本 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. Text 嵌套（富文本）</Text>

                {/* Text 可以嵌套 Text，子 Text 会继承父 Text 的样式 */}
                <Text style={styles.richText}>
                    这是普通文字，
                    <Text style={styles.highlight}>这是高亮</Text>，
                    <Text style={styles.boldText}>这是加粗</Text>，
                    <Text style={styles.linkText}>这是链接样式</Text>。
                </Text>

                {/* 实现段落缩进 */}
                <Text style={styles.paragraph}>
                    <Text>    </Text>
                    这是一个有首行缩进的段落。React Native 中可以通过在开头添加空格或使用 Text 嵌套的方式实现缩进效果。
                </Text>
            </View>

            {/* 5. Text 特殊属性 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. Text 特殊属性</Text>

                {/* numberOfLines - 限制行数 */}
                <Text style={styles.label}>numberOfLines={1}（限制1行）：</Text>
                <Text style={styles.limitedText} numberOfLines={1}>
                    这是一段很长的文字，会被截断显示省略号，不会换行到第二行。
                </Text>

                <Text style={styles.label}>numberOfLines={2}（限制2行）：</Text>
                <Text style={styles.limitedText} numberOfLines={2}>
                    这是一段很长的文字，最多显示两行。如果超过两行就会被截断并显示省略号。这里再多写一些内容来演示效果。
                </Text>

                {/* ellipsizeMode - 省略号位置 */}
                <Text style={styles.label}>ellipsizeMode="head"（头部省略）：</Text>
                <Text
                    style={styles.limitedText}
                    numberOfLines={1}
                    ellipsizeMode="head"
                >
                    这是一段很长的文字，省略号会出现在开头位置。
                </Text>

                <Text style={styles.label}>ellipsizeMode="middle"（中间省略）：</Text>
                <Text
                    style={styles.limitedText}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                >
                    这是一段很长的文字，省略号会出现在中间位置。
                </Text>

                {/* selectable - 允许选择文本 */}
                <Text style={styles.label}>selectable={true}（可选择）：</Text>
                <Text style={styles.selectableText} selectable={true}>
                    长按可以选择这段文字并复制
                </Text>
            </View>

            {/* 6. 文本对齐 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>6. 文本对齐</Text>

                <Text style={[styles.alignText, { textAlign: 'left' }]}>
                    左对齐（默认）
                </Text>
                <Text style={[styles.alignText, { textAlign: 'center' }]}>
                    居中对齐
                </Text>
                <Text style={[styles.alignText, { textAlign: 'right' }]}>
                    右对齐
                </Text>
            </View>

            {/* 7. 行高和字间距 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>7. 行高和字间距</Text>

                <Text style={styles.label}>默认行高：</Text>
                <Text style={styles.normalLineHeight}>
                    这是默认行高的文字。{'\n'}这是第二行。{'\n'}这是第三行。
                </Text>

                <Text style={styles.label}>增加行高（lineHeight: 28）：</Text>
                <Text style={styles.largeLineHeight}>
                    这是增加行高的文字。{'\n'}这是第二行。{'\n'}这是第三行。
                </Text>

                <Text style={styles.label}>字间距（letterSpacing: 4）：</Text>
                <Text style={styles.letterSpacing}>
                    增 加 字 间 距 的 效 果
                </Text>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• View 是通用容器，类似 div</Text>
                    <Text style={styles.summaryText}>• Text 用于显示文本</Text>
                    <Text style={styles.summaryText}>• 所有文字必须在 Text 内</Text>
                    <Text style={styles.summaryText}>• Text 可嵌套实现富文本</Text>
                    <Text style={styles.summaryText}>• numberOfLines 限制行数</Text>
                </View>
            </View>
        </DemoContainer>
    );
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
    code: {
        fontFamily: 'monospace',
        fontSize: 12,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        marginTop: 12,
        color: '#E91E63',
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginTop: 12,
        marginBottom: 4,
    },
    warning: {
        fontSize: 12,
        color: '#FF5722',
        marginTop: 12,
        backgroundColor: '#FFF3E0',
        padding: 8,
        borderRadius: 4,
    },

    // View 样式
    basicView: {
        backgroundColor: '#E3F2FD',
        padding: 16,
        marginVertical: 8,
    },
    styledView: {
        backgroundColor: '#6200EE',
        padding: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#3700B3',
    },
    viewText: {
        color: '#fff',
        textAlign: 'center',
    },

    // 嵌套 View
    outerView: {
        backgroundColor: '#FFECB3',
        padding: 16,
        borderRadius: 8,
    },
    innerView: {
        backgroundColor: '#FFE082',
        padding: 12,
        marginTop: 8,
        borderRadius: 4,
    },
    innerView2: {
        backgroundColor: '#FFD54F',
        padding: 12,
        marginTop: 8,
        borderRadius: 4,
    },
    labelText: {
        color: '#333',
    },

    // Text 样式
    largeText: {
        fontSize: 24,
        marginVertical: 4,
    },
    coloredText: {
        color: '#6200EE',
        marginVertical: 4,
    },
    boldText: {
        fontWeight: 'bold',
        marginVertical: 4,
    },
    italicText: {
        fontStyle: 'italic',
        marginVertical: 4,
    },

    // 富文本
    richText: {
        fontSize: 14,
        lineHeight: 24,
    },
    highlight: {
        backgroundColor: '#FFEB3B',
        color: '#333',
    },
    linkText: {
        color: '#2196F3',
        textDecorationLine: 'underline',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        marginTop: 8,
    },

    // Text 属性演示
    limitedText: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
    selectableText: {
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 4,
    },

    // 对齐
    alignText: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        marginVertical: 2,
    },

    // 行高
    normalLineHeight: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
    },
    largeLineHeight: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        lineHeight: 28,
    },
    letterSpacing: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
        letterSpacing: 4,
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

export default ViewTextDemo;
