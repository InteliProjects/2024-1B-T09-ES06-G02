import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

type User = {
    uuid: string;
    name: string;
    job_title: string;
    enterprise: string;
    cpf: string;
    photo_path: string;
  };

interface Props {
    uuid: string
}

const UserCardComponent: React.FC<Props> = ({uuid}) => {

    const [user, setUser] = useState<User>();
    const userId = uuid || "dd7580f7-54ac-41d8-8abf-f0d8a5754893"
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaV0gzZFR4cUc2Znp2QlpmZzVrUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kb21jb25uZWN0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZG9tY29ubmVjdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxNzc2ODg4NSwiZXhwIjoxNzE3ODU1Mjg1LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUCJ9.EMTprX-WMcYXJW6z1374XuWru5PhrXV5VX2-2Om0hHv53wPmQ1w2kCDtA4zItmUg35oc96kfQSJHhu39vpDDhRkAOFcYwagcot0nxp08RB27nqC5HjOB5XsBPtF6GAeNuGwYmaOMlzsc77CCAlzzwbCgSyE3fD1Vi7h9bH9plK6YIdeth1Wz48YGXWR9GVRHR_GBIsnEZPuQvdAzs0NoZeyLADSaln6J-fYgUWCaXcyC9wLxON7-q8VJqBZc4_s4V8IETh2cDpzvf6sl2fTcXndMEb1_KX3Ps9_yn46oP5xGzZxxxYWireCaPuirRfQi9GP4n2FipP9O9muUEznmow";

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/User/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
            });
            const user: User = await response.json();
            console.log(user, "oi")
            setUser(user);
          } catch (error) {
            console.error('Error fetching interested users:', error);
          }
        }; fetchUser()
      }, [uuid]);


    return (
        <View style={{ width: '100%', height: 100, alignItems: 'center' }}>
            <View style={{
                backgroundColor: '#757474', height: 80, width: 350, borderRadius: 50,
                shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8, shadowRadius: 2, elevation: 1,
                flexDirection: 'row', alignItems: 'center'
            }}>
                <Image source={{ uri: user?.photo_path }} style={{ height: 80, width: 80, borderRadius: 40 }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 16, fontSize: 18, color: 'white' }}>{user?.name}</Text>
                    <Text style={{ fontWeight: '300', marginLeft: 16, fontSize: 18, color: 'white' }}>{user?.enterprise}</Text>
                </View>
            </View>
        </View>
    );
}

export default UserCardComponent;