/**
 * SwitchDemo.js - Switch 开关组件演示
 */

import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const SwitchDemo = ({ onBack }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <DemoContainer title="Switch 开关" onBack={onBack}>
            {/* 基本使用 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>基本使用</Text>
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>基础开关</Text>
                    <Switch value={isEnabled} onValueChange={setIsEnabled} />
                </View>
                <Text style={styles.status}>状态: {isEnabled ? '开启' : '关闭'}</Text>
            </View>

            {/* 自定义颜色 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>自定义颜色</Text>
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>推送通知</Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#E0E0E0', true: '#B39DDB' }}
                        thumbColor={notifications ? '#6200EE' : '#f4f3f4'}
                    />
                </View>
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>深色模式</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
                        thumbColor={darkMode ? '#4CAF50' : '#f4f3f4'}
                    />
                </View>
            </View>

            {/* 总结 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>总结</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>• value: 当前值</Text>
                    <Text style={styles.summaryText}>• onValueChange: 值变化回调</Text>
                    <Text style={styles.summaryText}>• trackColor: 轨道颜色</Text>
                    <Text style={styles.summaryText}>• thumbColor: 按钮颜色</Text>
                </View>
            </View>
        </DemoContainer>
    );
};

const styles = StyleSheet.create({
    section: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    switchLabel: { fontSize: 16, color: '#333' },
    status: { marginTop: 12, fontSize: 14, color: '#6200EE', textAlign: 'center' },
    summaryBox: { backgroundColor: '#E3F2FD', padding: 12, borderRadius: 8 },
    summaryText: { color: '#1565C0', marginVertical: 2 },
});

export default SwitchDemo;
