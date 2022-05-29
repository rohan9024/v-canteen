import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import DeprecatedViewStylePropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { LoginContext } from '../Contexts/LoginContext';

const WaitScreen = ({ route }) => {

    const { orderID, price } = route.params;
    const { user } = useContext(LoginContext)
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState(true);

    useEffect(() => {
        async function getConfirmation() {

            const docRef = doc(db, "users", user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.data().confirm == true) {
                setConfirm(true)
            }
        }
        getConfirmation();
    }, [])




    return (

        <>
            {confirm ? (
                <View style={{
                    flex: 1,
                    backgroundColor: 'black'
                }}>
                    <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Order Confirmed</Text>
                </View>
            ) :

                (<View style={{
                    flex: 1,
                    backgroundColor: 'black'
                }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image
                            source={require('../assets/food3.gif')}
                            resizeMode="contain"
                            style={{ width: 260, height: 260, borderWidth: 100, borderColor: 'gray' }}
                        />
                        <Text style={{ color: 'white', fontSize: 20, marginBottom: 20, fontWeight: 'bold' }}>Food is being prepared...</Text>

                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginRight: 20 }}>Total: {price}</Text>
                            <Text onPress={() => navigation.navigate('Home')} style={{ color: 'black', fontWeight: 'bold', fontSize: 20, padding: 12, backgroundColor: 'orange', borderRadius: 10 }}>Order more</Text>
                        </View>
                    </View>
                </View>)
            }
        </>

    )
}

export default WaitScreen