import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountPage from "../screens/Account/AccountPage";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={AccountPage}
        options={{ title: "Mi cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
}
