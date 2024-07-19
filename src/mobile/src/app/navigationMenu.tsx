import 'expo-dev-client';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function NavigationMenu() {
  const { userInfo, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu de Navegação</Text>
      <Link href="/apiTest" style={styles.link}>Teste da API</Link>
      <Link href="/login" style={styles.link}>Login</Link>
      <Link href="/home" style={styles.link}>Home CEO</Link>
      <Link href="/home.fdc" style={styles.link}>Home FDC</Link>
      <Link href="/favorites" style={styles.link}>Favoritos</Link>
      <Link href="/registerProject" style={styles.link}>Cadastrar projeto</Link>
      <Link href="/synergy" style={styles.link}>Sinergias</Link>
      <Link href="/interestQuestionnaire" style={styles.link}>Questionário Parte 1</Link>
      <Link href="/profile" style={styles.link}>Tela de perfil CEO</Link>
      <Link href="/profileFDC" style={styles.link}>Tela de perfil FDC</Link>
      <Link href="/ProjectsQuest" style={styles.link}>Questionário de projetos</Link>
      <Link href="/Projects" style={styles.link}>Tela de projeto</Link>
      <Link href="/projectFDC" style={styles.link}>Tela de projeto FDC</Link>
      <Link href="/trend-page" style={styles.link}>Tela em alta FDC</Link>
      <Link href="/registerProjectScreen2" style={styles.link}>Cadastro de projeto 2</Link>
      <Link href="/news-page" style={styles.link}>Notícias</Link>
      <Link href="/register" style={styles.link}>Cadastro de usuário</Link>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: "#FFE6AF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    position: "absolute",
    bottom: 30,
  },
  logoutButtonText: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "ClearSans-Bold",
  }
});