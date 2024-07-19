import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const Participate = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Quero participar +</Text>
        </TouchableOpacity>
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
        backgroundColor: '#4CAF50',
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


export default Participate