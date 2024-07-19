import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface CustomCheckBoxProps {
    checked: boolean;
    onPress: () => void;
}


const CheckBox: React.FC<CustomCheckBoxProps> = ({ checked, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={stylesCheckBox.checkBoxContainer}>
            <View style={[stylesCheckBox.checkBox, checked && stylesCheckBox.checkedBox]}>
                {checked && <View style={stylesCheckBox.innerBox} />}
            </View>
        </TouchableOpacity>
    );
};

const stylesCheckBox = StyleSheet.create({
    checkBoxContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: '#3A8A88',
        borderRadius: 4,
    },
    innerBox: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 2,
    },
});


const SynergyModalContent = ({ visible, onClose, selectedSynergies, toggleCheckbox }: {
    visible: boolean,
    onClose: () => void,
    selectedSynergies: { [key: string]: boolean },
    toggleCheckbox: (synergy: string, value: boolean) => void
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sinergias</Text>
                    <Text style={{marginBottom: 20}}>Selecione todas as sinergias que se aplicam entre esse projeto e o seu :</Text>
                    <View style={styles.checkboxContainer}>
                        {Object.keys(selectedSynergies).map((synergy) => (
                            <View style={styles.checkboxRow} key={synergy}>
                                <CheckBox
                                    checked={selectedSynergies[synergy]}
                                    onPress={() => toggleCheckbox(synergy, !selectedSynergies[synergy])}
                                />

                                <Text style={styles.label}>{synergy}</Text>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#3A8A88',
        paddingVertical: 12,
        paddingHorizontal: 85,
        borderRadius: 24,
        width: 300
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        width: '100%',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#3A8A88',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SynergyModalContent

