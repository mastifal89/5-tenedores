import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantsPage from "../screens/Restaurants/RestaurantsPage";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import Restaurant from "../screens/Restaurants/Restaurant";
import AddReviewRestaurant from "../screens/Restaurants/AddReviewRestaurant";

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={RestaurantsPage}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen 
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Añadir nuevo restaurante" }}
      />
      <Stack.Screen 
        name="restaurant"
        component={Restaurant}
      />
      <Stack.Screen 
        name="add-review-restaurant"
        component={AddReviewRestaurant}
        options={{ title: "Nuevo comentario" }}
      />
    </Stack.Navigator>
  );
}
