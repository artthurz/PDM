import React, {useState, useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  IconButton,
  Colors,
  Modal,
  Portal,
  Provider,
  Button,
  TextInput,
} from "react-native-paper";
import api from "../services/api";

import { Text, View } from "../components/Themed";

export default function Items() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [id, setId] = useState(0);
  const [items, setItems] = useState();
  const [visible, setVisible] = useState(false);

  function showModal(item) {
    console.log(item);
    setVisible(true);
    setName(item.name);
    setQuantity(item.quantity);
    setId(item.id);
  }
  const hideModal = () => setVisible(false);

  async function loadItems() {
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteItem(id: BigInteger) {
    try {
      await api.delete(`/items/${id}`);
      loadItems();
    } catch (error) {
      console.log(error);
    }
  }

  async function editItem() {
    try {
      const response = await api.put(`/items/${id}`, {name, quantity});
      console.log(response);
      loadItems();
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit() {
    editItem();
    hideModal();
  }

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const rederItem = ({ item }) => (
    <>
      <View style={styles.container}>
        <Text style={styles.messageTitle}>{item.name}</Text>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.messageSubTitle}>Quantidade: </Text>
          <Text style={styles.message}>{item.quantity}</Text>
        </View>
        <View style={{flexDirection: "row"}}>
          <IconButton
            icon="square-edit-outline"
            color={Colors.blue500}
            size={25}
            onPress={() => showModal(item)}
          />
          <IconButton
            icon="trash-can-outline"
            color={Colors.red500}
            size={25}
            onPress={() => deleteItem(item.id)}
          />
        </View>
      </View>
      <View
        style={styles.itemSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Itens Cadastrados</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <FlatList
          style={styles.list}
          data={items}
          renderItem={rederItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
            style={styles.containerModal}
          >
            <View style={styles.containerModal}>
              <Text style={styles.title}>Editar Item</Text>
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              <TextInput
                style={styles.textInput}
                value={name}
                mode="outlined"
                label="Nome"
                onChangeText={(n) => setName(n)}
              />
              <TextInput
                style={styles.textInput}
                value={quantity.toString()}
                mode="outlined"
                label="Quantidade"
                keyboardType="numeric"
                onChangeText={(q) => setQuantity(q)}
              />
              <Button
                style={{marginTop: 30}}
                color={Colors.blue500}
                icon="content-save"
                onPress={() => handleSubmit()}
              >
                Salvar
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 400,
    borderRadius: 20
  },
  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  itemSeparator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  list: {
    width: "90%",
  },
  textInput: {
    width: "100%",
    marginBottom: 10
  },
  itemContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  }
});
