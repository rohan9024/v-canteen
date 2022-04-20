import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import hide from "../assets/hide.png"
import viewButton from "../assets/view.png"
import { db } from "../firebase"

const Signup = () => {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState(false);
    const navigation = useNavigation();


    const Signup = () => {
        const addUser = async () => {
            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                username: username,
                password: password
            });
            alert("Created user successfully");
            setUsername('')
            setName('')
            setPassword('')
            navigation.navigate('Login')
        }
        addUser()
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                    <TextInput
                        style={{
                            paddingLeft: 20, width: 250, height: 50, backgroundColor: 'white', borderRadius: 10
                        }}
                        onChangeText={setName}
                        value={name}
                        placeholder={'Enter your name'}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                    <TextInput
                        style={{
                            paddingLeft: 20, width: 250, height: 50, backgroundColor: 'white', borderRadius: 10
                        }}
                        onChangeText={setUsername}
                        value={username}
                        placeholder={'Set username'}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextInput
                        secureTextEntry={view ? false : true}
                        style={{
                            paddingLeft: 20, width: 250, height: 50, backgroundColor: 'white', borderRadius: 10,
                        }}
                        onChangeText={setPassword}
                        value={password}
                        placeholder={'Create Password'}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 10, marginLeft: 220 }} onPress={() => { view ? setView(false) : setView(true) }}>
                        {view ?
                            <Image
                                source={viewButton}
                                resizeMode="contain"
                                style={{ width: 20, height: 20 }}
                            />
                            :
                            <Image
                                source={hide}
                                resizeMode="contain"
                                style={{ width: 20, height: 20 }}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={Signup}>
                    <View style={{
                        width: 200,
                        height: 50,
                        borderRadius: 15,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: 'red',
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }} >Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 15 }} onPress={() => navigation.navigate('AdminLogin')}>Are you admin?</Text>
                </TouchableOpacity>

            </View>
        </View>


    )
}

export default Signup