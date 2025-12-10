/**
 * ModalDemo.js - Modal 组件演示
 * 
 * Modal 提供了一种简单的方式来显示覆盖在其他内容之上的内容。
 * 
 * 【学习要点】
 * 1. 基本使用
 * 2. 动画类型
 * 3. 半透明背景
 * 4. 关闭方式
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native';
import DemoContainer from '../../components/DemoContainer';

const ModalDemo = ({ onBack }) => {
    // Modal 可见状态
    const [basicVisible, setBasicVisible] = useState(false);
    const [slideVisible, setSlideVisible] = useState(false);
    const [fadeVisible, setFadeVisible] = useState(false);
    const [bottomVisible, setBottomVisible] = useState(false);
    const [centerVisible, setCenterVisible] = useState(false);

    return (
        <DemoContainer title="Modal 模态框" onBack={onBack}>
            {/* 按钮列表 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Modal 类型</Text>

                <ModalButton
                    title="基础 Modal"
                    description="默认无动画"
                    onPress={() => setBasicVisible(true)}
                />

                <ModalButton
                    title="slide 动画"
                    description="从底部滑入"
                    onPress={() => setSlideVisible(true)}
                />

                <ModalButton
                    title="fade 动画"
                    description="淡入淡出"
                    onPress={() => setFadeVisible(true)}
                />

                <ModalButton
                    title="底部弹出框"
                    description="常用于操作菜单"
                    onPress={() => setBottomVisible(true)}
                />

                <ModalButton
                    title="居中对话框"
                    description="常用于确认/提示"
                    onPress={() => setCenterVisible(true)}
                />
            </View>

            {/* 代码示例 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>代码示例</Text>
                <View style={styles.codeBlock}>
                    <Text style={styles.code}>
                        {`<Modal
  visible={isVisible}
  animationType="slide"  // none/slide/fade
  transparent={true}     // 背景透明
  onRequestClose={() => setVisible(false)}
>
  {/* Modal 内容 */}
</Modal>`}
                    </Text>
                </View>
            </View>

            {/* 属性说明 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>常用属性</Text>
                <View style={styles.propsList}>
                    <PropItem name="visible" desc="是否显示" />
                    <PropItem name="animationType" desc="动画类型: none/slide/fade" />
                    <PropItem name="transparent" desc="背景是否透明" />
                    <PropItem name="onRequestClose" desc="Android 返回键回调" />
                    <PropItem name="onShow" desc="显示时回调" />
                    <PropItem name="statusBarTranslucent" desc="是否延伸到状态栏" />
                </View>
            </View>

            {/* ========== Modal 组件 ========== */}

            {/* 1. 基础 Modal */}
            <Modal
                visible={basicVisible}
                animationType="none"
                onRequestClose={() => setBasicVisible(false)}
            >
                <View style={styles.modalFullScreen}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>基础 Modal</Text>
                        <TouchableOpacity onPress={() => setBasicVisible(false)}>
                            <Text style={styles.closeText}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalText}>这是一个全屏 Modal</Text>
                        <Text style={styles.modalText}>animationType="none"</Text>
                    </View>
                </View>
            </Modal>

            {/* 2. slide 动画 */}
            <Modal
                visible={slideVisible}
                animationType="slide"
                onRequestClose={() => setSlideVisible(false)}
            >
                <View style={styles.modalFullScreen}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>slide 动画</Text>
                        <TouchableOpacity onPress={() => setSlideVisible(false)}>
                            <Text style={styles.closeText}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalText}>从底部滑入</Text>
                        <Text style={styles.modalText}>animationType="slide"</Text>
                    </View>
                </View>
            </Modal>

            {/* 3. fade 动画 */}
            <Modal
                visible={fadeVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setFadeVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setFadeVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.fadeModalContent}>
                                <Text style={styles.modalTitle}>fade 动画</Text>
                                <Text style={styles.modalText}>淡入淡出效果</Text>
                                <Text style={styles.modalText}>transparent={'{true}'}</Text>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setFadeVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>关闭</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* 4. 底部弹出框 */}
            <Modal
                visible={bottomVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setBottomVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setBottomVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.bottomSheet}>
                                <View style={styles.bottomSheetHandle} />
                                <Text style={styles.bottomSheetTitle}>操作菜单</Text>

                                {['📷 拍照', '🖼️ 从相册选择', '📁 从文件选择'].map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.bottomSheetItem}
                                        onPress={() => setBottomVisible(false)}
                                    >
                                        <Text style={styles.bottomSheetItemText}>{item}</Text>
                                    </TouchableOpacity>
                                ))}

                                <TouchableOpacity
                                    style={styles.bottomSheetCancel}
                                    onPress={() => setBottomVisible(false)}
                                >
                                    <Text style={styles.bottomSheetCancelText}>取消</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* 5. 居中对话框 */}
            <Modal
                visible={centerVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setCenterVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.centerDialog}>
                        <Text style={styles.dialogTitle}>确认删除？</Text>
                        <Text style={styles.dialogMessage}>
                            此操作不可恢复，确定要删除吗？
                        </Text>

                        <View style={styles.dialogButtons}>
                            <TouchableOpacity
                                style={[styles.dialogButton, styles.dialogButtonCancel]}
                                onPress={() => setCenterVisible(false)}
                            >
                                <Text style={styles.dialogButtonCancelText}>取消</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.dialogButton, styles.dialogButtonConfirm]}
                                onPress={() => setCenterVisible(false)}
                            >
                                <Text style={styles.dialogButtonConfirmText}>删除</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </DemoContainer>
    );
};

/**
 * Modal 按钮
 */
const ModalButton = ({ title, description, onPress }) => (
    <TouchableOpacity style={styles.modalBtn} onPress={onPress}>
        <View>
            <Text style={styles.modalBtnTitle}>{title}</Text>
            <Text style={styles.modalBtnDesc}>{description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
);

/**
 * 属性项
 */
const PropItem = ({ name, desc }) => (
    <View style={styles.propItem}>
        <Text style={styles.propName}>{name}</Text>
        <Text style={styles.propDesc}>{desc}</Text>
    </View>
);

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

    // 按钮
    modalBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    modalBtnTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    modalBtnDesc: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    arrow: {
        fontSize: 16,
        color: '#ccc',
    },

    // 代码
    codeBlock: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#333',
    },

    // 属性列表
    propsList: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
    },
    propItem: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    propName: {
        fontFamily: 'monospace',
        color: '#E91E63',
        width: 150,
    },
    propDesc: {
        color: '#666',
        flex: 1,
    },

    // Modal 样式
    modalFullScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6200EE',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
    },
    modalBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalText: {
        fontSize: 16,
        color: '#666',
        marginVertical: 4,
    },

    // 半透明遮罩
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // fade Modal
    fadeModalContent: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
    },
    modalButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '600',
    },

    // 底部弹出
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    bottomSheetHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    bottomSheetItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    bottomSheetItemText: {
        fontSize: 16,
        textAlign: 'center',
    },
    bottomSheetCancel: {
        marginTop: 12,
        paddingVertical: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    bottomSheetCancelText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#F44336',
        fontWeight: '600',
    },

    // 居中对话框
    centerDialog: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: '80%',
    },
    dialogTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    dialogMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    dialogButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dialogButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    dialogButtonCancel: {
        backgroundColor: '#f0f0f0',
    },
    dialogButtonConfirm: {
        backgroundColor: '#F44336',
    },
    dialogButtonCancelText: {
        textAlign: 'center',
        color: '#666',
        fontWeight: '600',
    },
    dialogButtonConfirmText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
    },
});

export default ModalDemo;
