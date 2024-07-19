import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import InputWithIcon from "@/components/inputWithIcon";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Login", "E-mail ou senha incorretos.");
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/logo.png")}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <InputWithIcon
          label="E-mail"
          icon={"envelope"}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputWithIcon
          label="Senha"
          icon={"lock"}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <View style={styles.rowContainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={handleRememberMe}
              style={styles.checkbox}
            >
              <FontAwesome
                name={rememberMe ? "check-square-o" : "square-o"}
                size={24}
                color={rememberMe ? "#007BFF" : "#777"}
              />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Lembre-se de mim</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.form}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  logo: {
    width: 400,
    height: 400,
    alignSelf: "center",
  },
  form: {
    width: "100%",
    paddingHorizontal: 32,
    marginBottom: 32,
    marginTop: 16,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A8A88",
    paddingVertical: 16,
    borderRadius: 48,
    width: "100%",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 12,
    alignItems: "center",
  },
  forgotPassword: {
    color: "#00000",
    textAlign: "center",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  orText: {
    textAlign: "center",
    marginVertical: 16,
    fontSize: 12,
    color: "#555",
  },
  button: {
    marginBottom: 15,
  },
});

export default Login;
