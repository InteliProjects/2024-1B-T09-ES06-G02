// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { getToken } from '../auth/auth';

// export default function InterestQuestionnaire() {

//   interface subTheme {
//     id: number,
//     name: string,
//     description: string,
//     theme_id: number
//   }

//   const [subThemes, setSubThemes] = useState<subTheme[]>([]);
//   const [clicked, setClicked] = useState<Record<string, boolean>>({});
//   const userId = "1e7b199c-18a0-49cc-88e0-62f374a7162e"
 
//   useEffect(() => {
//     const fetchSubThemes = async () => {
//       const token = getToken();
//       try {
//         const response = await fetch('http://localhost:8000/api/subThemes', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.statusText} (${response.status})`);
//         }
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('A resposta não é JSON');
//         }
//         const data = await response.json();
//         setSubThemes(data.slice(0, 40));
//       } catch (error) {
//         console.error('Erro ao buscar dados dos subThemes:', error);
//         setSubThemes([]);
//       }
//     };
//     fetchSubThemes();
//   }, []);

//   const handlePress = (id: number) => {
//     setClicked(prevClicked => ({ ...prevClicked, [id]: !prevClicked[id] }));
//   };

//   const handleSubmit = async () => {
//     const selectedSubThemes = Object.keys(clicked).filter(key => clicked[key]);
//     console.log(selectedSubThemes)
//     const token = getToken();
//     try {
//       for (const subThemeId of selectedSubThemes) {
//         const response = await fetch('http://localhost:8000/api/UserSubThemes', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ user_id: userId, sub_theme_id: subThemeId })
//         });
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.statusText} (${response.status})`);
//         }
//       }
//       console.log('Subtemas enviados com sucesso');
//     } catch (error) {
//       console.error('Erro ao enviar subtemas:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.logo} source={require('../../../mobile/assets/images/logo.png')} />
//       <Text style={styles.title}>Interesses</Text>
//       <Text style={styles.description}>
//         Escolha três ou mais interesses que você gostaria de ver no feed principal
//       </Text>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.subthemesContainer}>
//           <View style={styles.subtheme}>
//             {subThemes.map((subtheme) => (
//               <TouchableOpacity
//                 key={subtheme.id}
//                 style={clicked[subtheme.id] ? styles.buttonClicked : styles.button}
//                 onPress={() => handlePress(subtheme.id)}
//               >
//                 <Text style={clicked[subtheme.id] ? styles.textClicked : styles.text}>{subtheme.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//       <View style={styles.continueButtonContainer}>
//         <TouchableOpacity onPress={handleSubmit}>
//           <Text style={styles.continueButtonText}>Continuar</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 24,
//     marginTop: 10,
//   },
//   logo: {
//     width: 64,
//     height: 64,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   description: {
//     textAlign: 'center',
//     color: '#888888',
//     marginTop: 8,
//     marginBottom: 16,
//     paddingHorizontal: 24,
//   },
//   scrollView: {
//     maxHeight: 420,
//     width: '100%',
//     paddingHorizontal: 16,
//   },
//   subthemesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   subtheme: {
//     marginVertical: 8,
//     paddingHorizontal: 16,
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: '100%', 
//     justifyContent: 'center'
//   },
//   continueButtonContainer: {
//     backgroundColor: '#3A8A88',
//     paddingHorizontal: 60,
//     paddingVertical: 15,
//     borderRadius: 25,
//     marginTop: 20,
//   },
//   continueButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     alignItems: 'center',

//   },
//   button: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     margin: 5,
//     alignItems: 'center',
//   },
//   buttonClicked: {
//     backgroundColor: '#3A8A88',
//     borderRadius: 15,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     margin: 5,
//     alignItems: 'center',
//   },
//   text: {
//     color: 'black',
//     fontSize: 13,
//     textAlign: 'center',
//   },
//   textClicked: {
//     color: 'white',
//     fontSize: 13,
//     textAlign: 'center',
//   },
// });






