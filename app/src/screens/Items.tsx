import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../components/Input';
import api from '../services/api'

import { Text, View } from '../components/Themed';

export default function ListItems() {
  const formRef = useRef(null);

  async function saveItems(data: Object) {
    try {
      await api.post('/items', data);
    } catch (error) {
      console.log(error);
    }
  }


  function handleSubmit(data: Object, { reset }) {
    saveItems(data);
    reset();
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nome"/>
          <Input name="quantity" type="number" placeholder="Quantidade" keyboardType="numeric"/>
          <Button title="Adicionar" onPress={() => formRef.current.submitForm()} />
      </Form>
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
});
