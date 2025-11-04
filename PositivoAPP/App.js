import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./src/pages/Welcome";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import MainNavigator from "./src/Navigation/Main";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = (dadosUsuario) => {
    setUsuarioLogado(dadosUsuario);
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="MainNavigator">
            {(props) => (
              <MainNavigator
                {...props}
                onLogout={handleLogout}
                usuarioLogado={usuarioLogado}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
