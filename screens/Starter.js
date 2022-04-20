import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Starter = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.view}>
            <Image
                source={require('../assets/food.gif')}
                resizeMode="cover"
                style={{ width: 280, height: 350, borderWidth: 100, borderColor: 'gray', marginTop: 20 }}
            />
            <Text style={{ fontSize: 20, marginTop: 50, fontSize: 20, fontWeight: 'bold' }}>V-Canteen</Text>
            <Text style={{ fontSize: 17, marginTop: 10 }}>Order Anything you wish</Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
                <View style={styles.view3}>
                    <Text style={styles.login} >Next</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default Starter

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flex: 1,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 90,
        width: 200,
        height: 50,
        borderRadius: 15,
        backgroundColor: "transparent",
        borderColor: 'red',
        borderWidth: 1,
    },
    view3: {
        borderColor: 'red',
        borderWidth: 2,
        width: 150,
        height: 50,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    view4: {
        borderColor: 'red',
        borderWidth: 2,
        width: 120,
        height: 50,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    text: {
        marginTop: 50,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
    divider: {
        backgroundColor: 'red',
        width: 1,
        height: 30,
    },
    signup: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    login: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        padding: 10,
        color: 'white',
    },
    text2: {
        marginTop: 10,
        color: 'black',
        fontSize: 20,
        fontWeight: '800'
    },
});