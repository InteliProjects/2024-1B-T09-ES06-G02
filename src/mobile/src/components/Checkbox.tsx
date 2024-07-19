import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const Checkbox = ({ isSelected, onToggle }) => (
    <View style={{ flexDirection: 'row', marginTop: 3, alignItems: 'flex-start', marginLeft: 10 }}>
        <TouchableOpacity
            style={{
                width: 16,
                height: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#3A8A88',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
            }}
            onPress={onToggle}
        >
            {isSelected && (
                <View
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: 10,
                        backgroundColor: '#3A8A88',
                    }}
                />
            )}
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '500', alignSelf: 'flex-start', marginLeft: 3 }}>
            Eu concordo com os Termos & Condições
        </Text>
    </View>
);

export default Checkbox;
