import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import hide from "../assets/hide.png"
import viewButton from "../assets/view.png"
import { LoginContext } from '../Contexts/LoginContext';
import { db } from "../firebase"

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [view, setView] = useState(false);
    const navigation = useNavigation();
    const [checkUsername, setCheckUsername] = useState(false)
    const [checkpass, setcheckpass] = useState(false)
    const { user, setUser } = useContext(LoginContext);

    const Signin = () => {
        const verifyManager = async () => {
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                setCheckUsername(true);
                const pq = query(collection(db, "users"), where("password", "==", password));
                const querySnapshotP = await getDocs(pq);
                if (querySnapshotP) {
                    setcheckpass(true);
                    console.log(checkUsername)
                    console.log(checkpass)
                    alert(`Logged successfully`)
                    setUsername('')
                    setPassword('')
                    const q = query(collection(db, "users"), where("username", "==", username));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setName(doc.data().name)
                    });
                    setUser({
                        name: name,
                        username: username,
                        password: password,
                    })
                    navigation.navigate('Home')
                }
                else {
                    setcheckpass(false)
                    alert('Wrong Password. Try again')
                }
            }
            else {
                alert('Wrong Username')
            }

        }
        verifyManager()
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                    <TextInput
                        style={{
                            paddingLeft: 20, width: 250, height: 50, backgroundColor: 'white', borderRadius: 10
                        }}
                        onChangeText={setUsername}
                        value={username}
                        placeholder={'Enter username'}
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
                        placeholder={'Password'}
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
                <Pressable style={{ marginLeft: 120, marginTop: 10 }}>
                    <Text style={{ color: 'gray', fontSize: 14 }}>Forgot Password?</Text>
                </Pressable>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={Signin}>
                    <View style={{
                        width: 200,
                        height: 50,
                        borderRadius: 15,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: 'red'
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }} >Login</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ display: 'flex', marginTop: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ height: 1, width: 80, backgroundColor: 'red' }} />
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>OR</Text>
                    <View style={{ height: 1, width: 80, backgroundColor: 'red' }} />
                </View>
                <TouchableOpacity style={{ marginTop: 30 }} onPress={() => navigation.navigate('Signup')}>
                    <View style={{
                        width: 200,
                        height: 50,
                        borderRadius: 15,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        borderColor: 'red',
                        borderWidth: 2,
                    }}>
                        <Text style={{
                            color: 'red',
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

export default Login