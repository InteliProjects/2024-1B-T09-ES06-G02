import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@/hooks/useAuth";

import FdcRoutes from "./fdc.routes";
import CeoRoutes from "./ceo.routes";
import SignIn from "@/screens/SignIn";

export function Routes() {
  const { userInfo } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {userInfo ? (
        userInfo.role === "CEO" ? (
          <CeoRoutes />
        ) : (
          <FdcRoutes />
        )
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}
