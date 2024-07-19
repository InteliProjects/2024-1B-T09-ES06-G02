import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const RegisterButton = ({ onPress }) => (
    <View style={{ flexDirection: 'row', marginTop: 4, alignSelf: 'center' }}>
        <TouchableOpacity
            style={{
                width: 206,
                backgroundColor: '#FFE6AF',
                alignItems: 'center',
                padding: 10,
                borderRadius: 100,
            }}
            onPress={onPress}
        >
            <Text style={{ color: 'black', fontSize: 16 }}>Cadastrar</Text>
        </TouchableOpacity>
    </View>
);

export default RegisterButton;
