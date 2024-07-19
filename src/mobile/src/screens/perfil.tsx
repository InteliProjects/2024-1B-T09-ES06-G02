import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function Perfil() {
  const { userInfo, signOut } = useAuth();
  const bannerHeight = Dimensions.get('window').height * 0.35;

  return (
    <View style={styles.container}>
      <View style={[styles.banner, { height: bannerHeight }]}>
        <Text style={styles.bannerTitle}>Perfil</Text>
        <Image source={{ uri: userInfo?.picture }} style={styles.avatar} />
        <Text style={styles.name}>{userInfo?.name}</Text>
        <Text style={styles.company}>Empresa: {userInfo?.hd}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  banner: {
    width: "100%",
    backgroundColor: "#3A8A88",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 40,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "ClearSans-Bold",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    marginBottom: 10,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "ClearSans-Bold",
  },
  company: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "ClearSans-Light",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: "#000000",
    fontSize: 24,
    fontFamily: "ClearSans-Bold",
  },
  statLabel: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "ClearSans-Bold",
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
  },
});
