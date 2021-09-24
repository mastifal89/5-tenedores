import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        screenOptions={{
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",

        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
        sceneContainerStyle={{ marginTop: 5 }}
      >
        <Tab.Screen
          name="restaurantsScreen"
          component={RestaurantsStack}
          options={{
            title: "Restaurantes",
            header: () => null
          }}
        />
        <Tab.Screen
          name="favoritesScreen"
          component={FavoritesStack}
          options={{ 
            title: "Favoritos",
            header: () => null
           }}
        />
        <Tab.Screen
          name="top-restaurantsScreen"
          component={TopRestaurantsStack}
          options={{ 
            title: "Top 5",
            header: () => null 
          }}
        />
        <Tab.Screen
          name="searchScreen"
          component={SearchStack}
          options={{ 
            title: "Buscar",
            header: () => null
          }}
        />
        <Tab.Screen
          name="accountScreen"
          component={AccountStack}
          options={{ 
            title: "Cuenta",
            header: () => null
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "restaurantsScreen":
      iconName = "compass-outline";
      break;
    case "favoritesScreen":
      iconName = "heart-outline";
      break;
    case "top-restaurantsScreen":
      iconName = "star-outline";
      break;
    case "searchScreen":
      iconName = "magnify";
      break;
    case "accountScreen":
      iconName = "home-outline";
      break;
    default:
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={28} color={color} />
  );
}
