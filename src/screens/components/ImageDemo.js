/**
 * ImageDemo.js - Image 组件演示
 * 
 * Image 组件用于显示图片，支持本地图片和网络图片。
 * 
 * 【学习要点】
 * 1. 显示网络图片
 * 2. 图片尺寸和样式
 * 3. resizeMode 属性
 * 4. 图片加载事件
 * 5. 背景图片
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const ImageDemo = ({ onBack }) => {
    // 图片加载状态
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // 示例图片 URL（使用占位图服务）
    const sampleImage = 'https://picsum.photos/200/200';
    const largeImage = 'https://picsum.photos/400/200';
    const portraitImage = 'https://picsum.photos/200/300';

    return (
        <DemoContainer title="Image 图片" onBack={onBack}>
            {/* 1. 基础网络图片 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. 网络图片</Text>

                {/* 网络图片必须指定 width 和 height */}
                <Image
                    source={{ uri: sampleImage }}
                    style={styles.basicImage}
                />

                <Text style={styles.code}>
                    {'<Image source={{ uri: "https://..." }} style={{ width, height }} />'}
                </Text>

                <Text style={styles.warning}>
                    ⚠️ 网络图片必须指定尺寸！
                </Text>
            </View>

            {/* 2. resizeMode 属性 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. resizeMode 属性</Text>
                <Text style={styles.tip}>控制图片如何适应容器</Text>

                <View style={styles.resizeModeContainer}>
                    {/* cover - 保持比例填满，可能裁切 */}
                    <View style={styles.resizeModeItem}>
                        <Text style={styles.resizeModeLabel}>cover</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={{ uri: largeImage }}
                                style={styles.resizeModeImage}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.resizeModeDesc}>保持比例填满{'\n'}可能裁切</Text>
                    </View>

                    {/* contain - 保持比例完整显示 */}
                    <View style={styles.resizeModeItem}>
                        <Text style={styles.resizeModeLabel}>contain</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={{ uri: largeImage }}
                                style={styles.resizeModeImage}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.resizeModeDesc}>保持比例{'\n'}完整显示</Text>
                    </View>

                    {/* stretch - 拉伸填满 */}
                    <View style={styles.resizeModeItem}>
                        <Text style={styles.resizeModeLabel}>stretch</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={{ uri: largeImage }}
                                style={styles.resizeModeImage}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={styles.resizeModeDesc}>拉伸填满{'\n'}可能变形</Text>
                    </View>
                </View>

                <View style={styles.resizeModeContainer}>
                    {/* center - 居中不缩放 */}
                    <View style={styles.resizeModeItem}>
                        <Text style={styles.resizeModeLabel}>center</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={{ uri: 'https://picsum.photos/60/60' }}
                                style={styles.resizeModeImage}
                                resizeMode="center"
                            />
                        </View>
                        <Text style={styles.resizeModeDesc}>居中{'\n'}不缩放</Text>
                    </View>

                    {/* repeat - 重复平铺 */}
                    <View style={styles.resizeModeItem}>
                        <Text style={styles.resizeModeLabel}>repeat</Text>
                        <View style={styles.imageBox}>
                            <Image
                                source={{ uri: 'https://picsum.photos/40/40' }}
                                style={styles.resizeModeImage}
                                resizeMode="repeat"
                            />
                        </View>
                        <Text style={styles.resizeModeDesc}>重复{'\n'}平铺</Text>
                    </View>
                </View>
            </View>

            {/* 3. 图片样式 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. 图片样式</Text>

                <View style={styles.imageRow}>
                    {/* 圆角图片 */}
                    <View style={styles.styledImageContainer}>
                        <Image
                            source={{ uri: sampleImage }}
                            style={[styles.styledImage, { borderRadius: 8 }]}
                        />
                        <Text style={styles.imageLabel}>圆角</Text>
                    </View>

                    {/* 圆形图片 */}
                    <View style={styles.styledImageContainer}>
                        <Image
                            source={{ uri: sampleImage }}
                            style={[styles.styledImage, { borderRadius: 40 }]}
                        />
                        <Text style={styles.imageLabel}>圆形</Text>
                    </View>

                    {/* 带边框 */}
                    <View style={styles.styledImageContainer}>
                        <Image
                            source={{ uri: sampleImage }}
                            style={[styles.styledImage, styles.borderedImage]}
                        />
                        <Text style={styles.imageLabel}>边框</Text>
                    </View>
                </View>

                {/* 带阴影（需要容器）*/}
                <View style={styles.shadowContainer}>
                    <Image
                        source={{ uri: largeImage }}
                        style={styles.shadowImage}
                    />
                </View>
                <Text style={styles.imageLabel}>带阴影效果</Text>
            </View>

            {/* 4. 图片加载事件 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. 图片加载事件</Text>

                <View style={styles.loadingContainer}>
                    {loading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#6200EE" />
                            <Text style={styles.loadingText}>加载中...</Text>
                        </View>
                    )}

                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>❌ 图片加载失败</Text>
                        </View>
                    ) : (
                        <Image
                            source={{ uri: 'https://picsum.photos/300/150' }}
                            style={styles.loadingImage}
                            // onLoadStart: 开始加载
                            onLoadStart={() => setLoading(true)}
                            // onLoad: 加载完成
                            onLoad={() => setLoading(false)}
                            // onError: 加载失败
                            onError={() => {
                                setLoading(false);
                                setError(true);
                            }}
                        />
                    )}
                </View>

                <Text style={styles.code}>
                    {'onLoadStart / onLoad / onError'}
                </Text>
            </View>

            {/* 5. ImageBackground 背景图 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. ImageBackground 背景图</Text>

                <ImageBackground
                    source={{ uri: 'https://picsum.photos/400/200' }}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    {/* 在图片上显示内容 */}
                    <View style={styles.overlayContent}>
                        <Text style={styles.overlayTitle}>背景图片</Text>
                        <Text style={styles.overlayText}>可以在上面放置任何内容</Text>
                    </View>
                </ImageBackground>

                <Text style={styles.code}>
                    {'<ImageBackground source={...}>\n  <子内容 />\n</ImageBackground>'}
                </Text>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• 网络图片必须指定尺寸</Text>
                    <Text style={styles.summaryText}>• source={{ uri: "url" }}</Text>
                    <Text style={styles.summaryText}>• resizeMode 控制缩放方式</Text>
                    <Text style={styles.summaryText}>• 圆形图片：borderRadius = 宽/2</Text>
                    <Text style={styles.summaryText}>• 背景图使用 ImageBackground</Text>
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
        marginTop: 8,
        backgroundColor: '#FFF3E0',
        padding: 8,
        borderRadius: 4,
    },
    imageLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
    },

    // 基础图片
    basicImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        backgroundColor: '#f0f0f0',
    },

    // resizeMode 演示
    resizeModeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    resizeModeItem: {
        alignItems: 'center',
        flex: 1,
    },
    resizeModeLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6200EE',
        marginBottom: 4,
    },
    imageBox: {
        width: 80,
        height: 80,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resizeModeImage: {
        width: '100%',
        height: '100%',
    },
    resizeModeDesc: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
        marginTop: 4,
    },

    // 图片样式
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    styledImageContainer: {
        alignItems: 'center',
    },
    styledImage: {
        width: 80,
        height: 80,
        backgroundColor: '#f0f0f0',
    },
    borderedImage: {
        borderWidth: 3,
        borderColor: '#6200EE',
    },
    shadowContainer: {
        alignSelf: 'center',
        borderRadius: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        backgroundColor: '#fff',
    },
    shadowImage: {
        width: 250,
        height: 120,
        borderRadius: 8,
    },

    // 加载状态
    loadingContainer: {
        position: 'relative',
        height: 150,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 1,
    },
    loadingText: {
        marginTop: 8,
        color: '#666',
    },
    loadingImage: {
        width: '100%',
        height: 150,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#F44336',
    },

    // 背景图
    imageBackground: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
    },
    overlayContent: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 16,
        borderRadius: 8,
    },
    overlayTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    overlayText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4,
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

export default ImageDemo;
