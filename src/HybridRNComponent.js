/**
 * HybridRNComponent.js
 * 专门用于混合界面展示的 React Native 组件
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HybridRNComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>⚛️</Text>
            <Text style={styles.title}>React Native</Text>
            <Text style={styles.subtitle}>ReactRootView Embedded</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF3E0',
    },
    emoji: {
        fontSize: 40,
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E65100',
    },
    subtitle: {
        fontSize: 14,
        color: '#F57C00',
        marginTop: 8,
    },
});

export default HybridRNComponent;
