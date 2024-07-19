import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface AvaliationProps {
  userId: string; 
  projectId: number; 
}


const Avaliation: React.FC<AvaliationProps> = ({ userId, projectId }) => {

  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaV0gzZFR4cUc2Znp2QlpmZzVrUCJ9.eyJpc3MiOiJodHRwczovL2Rldi1kb21jb25uZWN0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZG9tY29ubmVjdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxNzc2ODg4NSwiZXhwIjoxNzE3ODU1Mjg1LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJuT3ZCbWxvUHVQUXFzQXFyWGMycVdFNkFyUjl1NFhjUCJ9.EMTprX-WMcYXJW6z1374XuWru5PhrXV5VX2-2Om0hHv53wPmQ1w2kCDtA4zItmUg35oc96kfQSJHhu39vpDDhRkAOFcYwagcot0nxp08RB27nqC5HjOB5XsBPtF6GAeNuGwYmaOMlzsc77CCAlzzwbCgSyE3fD1Vi7h9bH9plK6YIdeth1Wz48YGXWR9GVRHR_GBIsnEZPuQvdAzs0NoZeyLADSaln6J-fYgUWCaXcyC9wLxON7-q8VJqBZc4_s4V8IETh2cDpzvf6sl2fTcXndMEb1_KX3Ps9_yn46oP5xGzZxxxYWireCaPuirRfQi9GP4n2FipP9O9muUEznmow";
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingPress = (value: number) => {
    setRating(value === rating ? null : value);
  };

  useEffect(() => {
    if (rating !== null) {
      const submitRating = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/interests', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              user_id: userId,
              project_id: projectId,
              interest_level: rating,
          }),
        });
          if (!response.ok) {
            throw new Error('Failed to post interest');
          }

          console.log('Interest posted successfully', { userId, projectId, rating });
        } catch (error) {
          console.error('Error posting interest:', error);
        }
      };

      submitRating();
    }
  }, [rating, userId, projectId]);

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => (
        <TouchableOpacity
          key={value}
          style={[styles.circle, rating === value && styles.selectedCircle]}
          onPress={() => handleRatingPress(value)}
        >
          <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  selectedCircle: {
    borderColor: 'transparent',
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 12,
    color: '#888',
  },
});

export default Avaliation;
