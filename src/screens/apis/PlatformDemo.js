/**
 * PlatformDemo.js - Platform 平台检测演示
 */

import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const PlatformDemo = ({ onBack }) => {
    return (
        <DemoContainer title="Platform 平台" onBack={onBack}>
            {/* 1. 基本信息 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>当前平台信息</Text>
                <View style={styles.infoCard}>
                    <InfoItem label="Platform.OS" value={Platform.OS} />
                    <InfoItem label="Platform.Version" value={String(Platform.Version)} />
                    <InfoItem label="isTV" value={String(Platform.isTV)} />
                </View>
            </View>

            {/* 2. Platform.select */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Platform.select</Text>
                <Text style={styles.tip}>根据平台返回不同值</Text>

                <View style={[styles.selectBox, Platform.select({
                    ios: { backgroundColor: '#000' },
                    android: { backgroundColor: '#3DDC84' },
                    default: { backgroundColor: '#666' },
                })]}>
                    <Text style={styles.selectText}>
                        {Platform.select({
                            ios: '🍎 iOS 平台',
                            android: '🤖 Android 平台',
                            default: '其他平台',
                        })}
                    </Text>
                </View>

                <View style={styles.codeBlock}>
                    <Text style={styles.code}>
                        {`Platform.select({
  ios: { ... },
  android: { ... },
  default: { ... },
})`}
                    </Text>
                </View>
            </View>

            {/* 3. 条件判断 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>条件判断</Text>

                <View style={styles.codeBlock}>
                    <Text style={styles.code}>
                        {`if (Platform.OS === 'ios') {
  // iOS 特定代码
} else if (Platform.OS === 'android') {
  // Android 特定代码
}`}
                    </Text>
                </View>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• Platform.OS: 'ios' | 'android'</Text>
                    <Text style={styles.summaryText}>• Platform.Version: 系统版本</Text>
                    <Text style={styles.summaryText}>• Platform.select(): 平台选择器</Text>
                </View>
            </View>
        </DemoContainer>
    );
};

const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    section: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
    tip: { fontSize: 12, color: '#888', marginBottom: 12 },

    infoCard: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12 },
    infoItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
    infoLabel: { fontFamily: 'monospace', color: '#E91E63' },
    infoValue: { fontWeight: '600', color: '#333' },

    selectBox: { padding: 20, borderRadius: 8, alignItems: 'center' },
    selectText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    codeBlock: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginTop: 12 },
    code: { fontFamily: 'monospace', fontSize: 11, color: '#333' },

    summaryBox: { backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8 },
    summaryText: { color: '#1565C0', marginVertical: 2 },
});

export default PlatformDemo;
