import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesPage from "../screens/Favorites/FavoritesPage";

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={FavoritesPage}
        options={{ title: "Restaurantes Favoritos" }}
      />
    </Stack.Navigator>
  );
}
