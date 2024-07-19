import { createContext, ReactNode, useState, useEffect } from "react";
import { User, ceo, fdc } from "@/services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthContextDataProps {
  userInfo: User | null;
  isUserLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setIsUserLoading(true);
    try {
      let user = null;
      if (email === ceo.email && password === ceo.password) {
        user = ceo;
      } else if (email === fdc.email && password === fdc.password) {
        user = fdc;
      }

      if (user) {
        setUserInfo(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      } else {
        throw new Error("E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signOut() {
    setIsUserLoading(true);
    try {
      await AsyncStorage.removeItem("@user");
      setUserInfo(null);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function loadUser() {
    const data = await AsyncStorage.getItem("@user");
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isUserLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
