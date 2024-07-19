import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import InputField from '../components/InputField';
import RegisterButton from '../components/RegisterButton';
import api from '@/services/api';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [cpf, setCpf] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [imageAttached, setImageAttached] = useState(false);
    const [success, setSuccess] = useState(false);  // Novo estado

    const handleSubmit = async () => {
        const userData = {
            name,
            job_title: jobTitle,
            enterprise,
            cpf,
            photo_path: image
        };

        try {
            const response = await api.post('/api/user', userData);
            setSuccess(true);  // Define o estado de sucesso como verdadeiro
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            } else {
                setError('Erro desconhecido');
            }
            Alert.alert('Erro', error.message || 'Erro desconhecido');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            setImageAttached(true);
        }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, paddingTop: 6, marginTop: 3 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Image
                        style={{ width: 64, height: 64, marginTop: 3 }}
                        source={require('../assets/images/logo.png')}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginTop: 3 }}>
                    <Text style={{ fontSize: 25, fontWeight: '500', alignSelf: 'flex-start', marginLeft: 25, marginBottom: 9 }}>
                        Cadastro de Novo Usuário
                    </Text>
                    <Image
                        source={require('../assets/images/line.png')}
                        style={{ width: 350, height: 1, marginTop: 1, marginBottom: 2, alignSelf: 'center' }}
                    />
                </View>
                <InputField label="Nome" value={name} onChangeText={setName} />
                <InputField label="Cargo" value={jobTitle} onChangeText={setJobTitle} />
                <InputField label="Empresa" value={enterprise} onChangeText={setEnterprise} />
                <InputField label="CPF" value={cpf} onChangeText={setCpf} />
                <Text style={{ fontSize: 18, fontWeight: '400', alignSelf: 'flex-start', marginLeft: 30, marginTop: 25 }}>
                    Foto de perfil
                </Text>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    {imageAttached ? (
                        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Imagem anexada</Text>
                    ) : (
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                backgroundColor: '#dcdcdc',
                                padding: 10,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 200,
                            }}
                        >
                            <Text style={{ color: 'black' }}>Anexar Imagem</Text>
                        </TouchableOpacity>
                    )}
                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={{ width: 200, height: 200, marginTop: 10 }}
                        />
                    )}
                </View>
                <Image
                    source={require('../assets/images/line.png')}
                    style={{ width: 350, height: 1, marginTop: 27, marginBottom: 27, alignSelf: 'center' }}
                />
                <RegisterButton onPress={handleSubmit} />
                {success && (
                    <Text testID="successMessage" style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>
                        Usuário cadastrado com sucesso!
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}
