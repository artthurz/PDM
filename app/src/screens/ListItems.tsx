import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import api from '../services/api'

import { Text, View } from '../components/Themed';

export default function Items() {
  const [items, setItems] = useState();

  async function loadItems() {
    try {
      const response = await api.get('/items');
      setItems(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadItems();
  }, [items])

  const rederItem = ({ item }) => (
    <>
      <Text style={styles.messageTitle}>{item.name}</Text>
        <Text style={styles.message}>Quantidade: {item.quantity}</Text>
        <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        />
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens Cadastrados</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={styles.list}
        data={items}
        renderItem={rederItem}
        keyExtractor={item => item.id}
      />
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
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    width: '90%',
  }
});
