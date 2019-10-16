import React, { useState } from 'react';
import { View,AsyncStorage, TouchableOpacity, Text, TextInput, StyleSheet, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import Api from '../services/api'

export default function Book({ navigation }) {
  const spotId = navigation.getParam('id')
  const [date,setDate] = useState('')
  async function handleSubmit(){
    const userId = await AsyncStorage.getItem('user')
    const response = await Api.post(`/spot/${spotId}/booking`,{
      headers:{
        user:userId,
      },
      date,
    })
    navigation.navigate('List')
  }
  function handleCancel(){
    navigation.navigate('List')
  }
  return (
    <KeyboardAvoidingView style={style.androidSafeArea}>
      <View style={style.cotainer}>
        <Text style={style.label}>Data da reserva</Text>
        <TextInput
          style={style.input}
          placeholder="Data de interesse"
          autoCapitalize="none"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />
         <TouchableOpacity
          style={style.button}
          onPress={handleSubmit}
        >
          <Text style={style.buttonText}>
            Reservar  
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity
          style={style.cancelButton}
          onPress={handleCancel}
        >
          <Text style={style.buttonText}>
            Cancelar 
          </Text> 
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>

  );
}

const style = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0
  },
  cotainer: {
    alignSelf: 'center',
    marginTop: 50,
    paddingHorizontal:20,
    width:320 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 2,
    color: '#444',
    marginBottom: 20,
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:15,
  },
  cancelButton: {
    height: 42,
    backgroundColor: '#ccc',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
})
