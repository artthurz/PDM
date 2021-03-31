import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function Home() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textInput: {
    width: "100%",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#3751FF",
    borderRadius: 20,
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: "90%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center"
  },
});
