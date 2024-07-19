import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        height: 40,
        width: 105,
        borderRadius: 100,
        backgroundColor: '#EFEDED',
        marginRight: 3,
        marginLeft: 3,
    },
    selectedButton: {
        backgroundColor: '#3A8A88',
        color: '#FFFFFF'
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
    },
    selectedButtonText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
});

const GenderSelector = ({ selectedGender, onSelect }) => (
    <View className="flex-row mt-3 self-center">
        {['Masculino', 'Feminino', 'Outro'].map(gender => (
            <TouchableOpacity
                key={gender}
                style={[
                    styles.button,
                    selectedGender === gender.toLowerCase() && styles.selectedButton,
                ]}
                onPress={() => onSelect(gender.toLowerCase())}
            >
                <Text style={[styles.buttonText, selectedGender === gender.toLowerCase() && styles.selectedButtonText]}>
                    {gender}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default GenderSelector;
