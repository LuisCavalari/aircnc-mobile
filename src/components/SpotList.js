import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Api from '../services/api'

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        async function loadSpots() {
            const response = await Api.get('/spot', {
                params: {
                    tech
                }
            })
            setSpots(response.data.spots)
        }
        loadSpots()
    }, [])

    function handleNavigation(id) {
        navigation.navigate('Book', { id })
    }
    return (
        <View style={style.container}>
            <Text style={style.title}>Empresas que utilizam <Text style={style.titleBold} >{tech}</Text></Text>
            <FlatList
                style={style.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={style.listItem}>
                        <Image style={style.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={style.company}>{item.company}</Text>
                        <Text style={style.price}>{item.price ? `R$ ${item.price}/dia` : 'Gratuito'}</Text>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonText} onPress={()=> handleNavigation(item._id)}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        marginBottom: 15,
        paddingHorizontal: 20
    },
    titleBold: {
        fontWeight: 'bold'
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        height: 120,
        width: 200,
        resizeMode: "cover",
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }

})

export default withNavigation(SpotList) 