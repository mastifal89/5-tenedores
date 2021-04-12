import React from "react";
import { View, Text, Button } from "react-native";
import * as firebase from "firebase";

export default function UserLogged() {
  return (
    <View>
      <Text>User Logged</Text>

      <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
