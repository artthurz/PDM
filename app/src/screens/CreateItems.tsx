import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import api from "../services/api";
import { Button, TextInput, Colors, Snackbar } from "react-native-paper";

import { Text, View } from "../components/Themed";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CreateItems() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const onToggleSnackBar = () => {
    setVisible(!visible);
    setErrorVisible(false);
  };

  const onDismissSnackBar = () => setVisible(false);

  const onToggleErrorSnackBar = () => {
    setErrorVisible(!visible);
    setVisible(false);
  };

  const onDismissErrorSnackBar = () => setErrorVisible(false);

  async function saveItems() {
    try {
      await api.post("/items", { name, quantity });
      if (quantity % 10 === 0) {
        schedulePushNotification(
          "Novo item cadastrado! 🚀",
          `Foram adicionadas ${quantity} unidades do item ${name}!`
        );
      }
      onToggleSnackBar();
    } catch (error) {
      onToggleErrorSnackBar();
      console.log(error);
    }
  }

  function handleSubmit() {
    saveItems();
    setName("");
    setQuantity("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        style={styles.textInput}
        selectionColor={Colors.blue500}
        underlineColor={Colors.blue500}
        value={name}
        mode="outlined"
        label="Nome"
        onChangeText={(n) => setName(n)}
      />
      <TextInput
        style={styles.textInput}
        selectionColor={Colors.blue500}
        underlineColor={Colors.blue500}
        value={quantity.toString()}
        mode="outlined"
        label="Quantidade"
        keyboardType="numeric"
        onChangeText={(q) => setQuantity(q)}
      />
      <Button
        style={{ marginTop: 30 }}
        icon="content-save"
        onPress={() => handleSubmit()}
      >
        Adicionar
      </Button>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
        Item adicionado com sucesso!
      </Snackbar>
      <Snackbar
        visible={errorVisible}
        onDismiss={onDismissErrorSnackBar}
        duration={3000}
      >
        Erro ao adicionar item.
      </Snackbar>
    </View>
  );
}

async function schedulePushNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: new Date() },
    },
    trigger: {seconds: 1},
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textInput: {
    width: "80%",
    marginBottom: 10,
  },
});
