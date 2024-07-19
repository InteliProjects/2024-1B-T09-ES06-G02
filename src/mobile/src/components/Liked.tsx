import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface LikedProps {
  userId: string;
  projectId: number;
}

const Liked: React.FC<LikedProps> = ({ userId, projectId }) => {
  const [liked, setLiked] = useState(false);

  const handlePress = async () => {
    setLiked(!liked);
    
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaV0gzZFR4cUc2Znp2QlpmZzVrUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kb21jb25uZWN0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZG9tY29ubmVjdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxNzc2ODg4NSwiZXhwIjoxNzE3ODU1Mjg1LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUCJ9.EMTprX-WMcYXJW6z1374XuWru5PhrXV5VX2-2Om0hHv53wPmQ1w2kCDtA4zItmUg35oc96kfQSJHhu39vpDDhRkAOFcYwagcot0nxp08RB27nqC5HjOB5XsBPtF6GAeNuGwYmaOMlzsc77CCAlzzwbCgSyE3fD1Vi7h9bH9plK6YIdeth1Wz48YGXWR9GVRHR_GBIsnEZPuQvdAzs0NoZeyLADSaln6J-fYgUWCaXcyC9wLxON7-q8VJqBZc4_s4V8IETh2cDpzvf6sl2fTcXndMEb1_KX3Ps9_yn46oP5xGzZxxxYWireCaPuirRfQi9GP4n2FipP9O9muUEznmow";
    const interaction = liked ? 0 : 1;  

    try {
      const response = await fetch('http://localhost:8000/api/Interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          project_id: projectId,
          interaction: interaction
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
    } catch (error) {
      console.error('Error posting interaction:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="heart" size={30} color={liked ? 'red' : 'gray'} />
      </View>
    </TouchableOpacity>
  );
};

export default Liked;