import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import api from '../services/api'
import {
  Button,
  TextInput,
  Colors,
  Snackbar
} from "react-native-paper";

import { Text, View } from '../components/Themed';

export default function ListItems() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const onToggleSnackBar = () => {
    setVisible(!visible)
    setErrorVisible(false)
  };

  const onDismissSnackBar = () => setVisible(false);

  const onToggleErrorSnackBar = () => {
    setErrorVisible(!visible)
    setVisible(false)
  };

  const onDismissErrorSnackBar = () => setErrorVisible(false);



  async function saveItems() {
    try {
      await api.post('/items', {name, quantity});
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
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
          style={{marginTop: 30}}
          icon="content-save"
          onPress={() => handleSubmit()}
        >
          Adicionar
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}
        >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    width: "80%",
    marginBottom: 10
  },
});
