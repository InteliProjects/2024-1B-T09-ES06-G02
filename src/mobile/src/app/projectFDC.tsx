import React from 'react';
import { View, Text, Image, ScrollView} from 'react-native';
import UserCardComponent from '@/components/UserCardComponent';

export default function ProjectFDC() {
    return (
        <ScrollView>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ width: '100%', height: 80, marginTop: 48, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('@/assets/images/arrow-left.png')} style={{ height: 25, width: 29, marginLeft: 16, marginTop: 24 }} />
                    <Image source={require('@/assets/images/favorite.png')} style={{ height: 30, width: 30, marginTop: 24, marginRight: 16 }} />
                </View>
                <View style={{ width: '100%', height: 168, alignItems: 'center', marginBottom: 20 }}>
                    <Image source={require('@/assets/images/image-project.png')} style={{ height: 175, width: 350 }} />
                </View>
                <View style={{ width: '100%', height: 130, alignItems: 'center'}}>
                    <Text style={{ fontWeight: '400', marginLeft: 16, fontSize: 18, marginTop: 16, marginRight: 16}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                    </Text>
                </View>
                <UserCardComponent/>
                <View style={{ width: '100%', height: 96, flexDirection: 'column' }}>
                    <View style={{ width: '100%', height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '300', marginLeft: 30, fontSize: 18, color: '#757474' }}>Curtidas</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#757474' }}>20</Text>
                            <Image source={require('@/assets/images/likes.png')} style={{ height: 15, width: 18, marginLeft: 8 }} />
                        </View>
                    </View>
                    <Image source={require('@/assets/images/line.png')} style={{ height: 1, width: 350, alignSelf: 'center' }} />
                    <View style={{ width: '100%', height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '300', marginLeft: 30, fontSize: 18, color: '#757474' }}>Média de interesse</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#757474' }}>4,7</Text>
                            <Image source={require('@/assets/images/star.png')} style={{ height: 23, width: 22, marginLeft: 8 }} />
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 100, flexDirection: 'column' }}>
                    <Text style={{ fontWeight: '500', marginLeft: 30, fontSize: 24, color: '#000000', marginTop: 16 }}>Impacto gerado</Text>
                    <Image source={require('@/assets/images/line.png')} style={{ height: 1, width: 350, alignSelf: 'center', marginTop: 8 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#3A8A88', height: 35, width: 115, borderRadius: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginTop: 16 }}>
                            <Text style={{ fontWeight: '300', fontSize: 14, color: 'black', marginLeft: 8 }}>Meio ambiente</Text>
                        </View>
                        <View style={{ backgroundColor: '#C2956C', height: 35, width: 115, borderRadius: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginTop: 16 }}>
                            <Text style={{ fontWeight: '300', fontSize: 14, color: 'black', marginLeft: 40 }}>Social</Text>
                        </View>
                        <View style={{ backgroundColor: '#C2956C', height: 35, width: 115, borderRadius: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginTop: 16 }}>
                            <Text style={{ fontWeight: '300', fontSize: 14, color: 'black', marginLeft: 28 }}>Educação</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
