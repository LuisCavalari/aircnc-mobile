import React, { useState , useEffect} from 'react';
import Logo from '../assets/logo.png'
import Api from '../services/api'
import { View, KeyboardAvoidingView, AsyncStorage, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


export default function Login({ navigation }) {
  const [tech, setTech] = useState('')
  const [email, setEmail] = useState('')

  useEffect(()=>{
    AsyncStorage.getItem('user')
      .then((user)=>{
        if(user)
          navigation.navigate('List')
      })
  },[])

  async function handleSubmit() {
    const response = await Api.post('/session', {
      email
    })
    const { _id } = response.data


    await AsyncStorage.setItem('user', _id)

    await AsyncStorage.setItem('techs', tech)

    navigation.navigate('List')

  }

  return (

    <KeyboardAvoidingView style={style.container}>
      <Image source={Logo} />
      <View style={style.form}>
        <Text style={style.label}>Seu email *</Text>
        <TextInput
          style={style.input}
          placeholder="Seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={style.label}>Tecnologias *</Text>
        <TextInput
          style={style.input}
          placeholder="Tecnologias de interesse"
          autoCapitalize="none"
          autoCorrect={false}
          value={tech}
          onChangeText={setTech}
        />
        <TouchableOpacity
          style={style.button}
          onPress={handleSubmit}
        >
          <Text style={style.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>


    </KeyboardAvoidingView>

  );

}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }

})
