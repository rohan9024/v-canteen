import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CartState } from '../Contexts/CartContext';
import { LoginContext } from '../Contexts/LoginContext';
import { db, storage } from '../firebase';

const StaffScreen = () => {
    const [orders, setorders] = useState([]);
    const [submitted, setsubmitted] = useState(false);
    const { user, setUser } = useContext(LoginContext);

    useEffect(() => {
        if (!submitted) {
            const fetchOrders = async () => {
                const q = query(collection(db, "orders"), where("confirm", "==", false));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    setorders((order) => [...order, { id: doc.id, username: doc.data().username, name: doc.data().name, price: doc.data().price, userID: doc.data().userID }])
                    console.log(doc.id, " => ", doc.data());
                });
            }
            fetchOrders();
            setsubmitted(true)
        }

    }, [])

    async function update(order) {
        const docRef = doc(db, "orders", order.id);
        const userRef = doc(db, "users", order.userID);

        await updateDoc(docRef, {
            confirm: true
        });

        await updateDoc(userRef, {
            confirm: true
        });

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', fontWeight: 'bold', marginTop: 80 }}>List of orders</Text>
            <View style={{ marginTop: 20 }}>
                {orders.map((order) => (
                    <View key={order.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>

                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, width: 150 }}>{order.name}</Text>

                            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 18, color: 'white', fontSize: 15, width: 80, marginRight: 10 }}>Ordered by: </Text>
                                <Text style={{ color: 'white', fontSize: 15, width: 70 }}>{order.username}</Text>
                            </View>

                        </View>

                        <TouchableOpacity onPress={() => update(order)} style={{ padding: 10, backgroundColor: 'orange', borderRadius: 10, marginLeft: 40 }}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

        </View>
    )
}

export default StaffScreen