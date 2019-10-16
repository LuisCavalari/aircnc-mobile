import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png'
import SpotList from '../components/SpotList'
import { View, AsyncStorage, Platform, Text, ScrollView, Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';


export default function List() {
  useEffect(() => {
    AsyncStorage.getItem('techs')
      .then(storageTechs => {
        const techsList = storageTechs.split(',').map(tech => tech.trim())
        setTechs(techsList)
      })

  }, [])
  const [techs, setTechs] = useState([])

  return (
    <SafeAreaView style={style.androidSafeArea}>
      <Image
        source={Logo}
        style={style.logo}
      />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0

  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center"
  },

})
