import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CartScreen = ({ route }) => {
    const navigation = useNavigation();
    const choice = route.params

    const confirmOrder = () => {

    }
    console.log(choice)

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'black' }}>
            {choice.map((choice) => (
                // <View key={choice.id}>

                // </View>
                <Text style={{ color: 'white' }}>{choice.name}</Text>
            ))}
            {/* {choice ?
                (
                    <View style={{ flex: 1, backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            {choices.map((choice) => (
                                <View key={choice.id}>
                                    <Text>{choice.name}</Text>
                                </View>
                            ))}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            Cart full
                        </Text>
                    </View>
                )
                choice.map((choice) => (
                    <View key={choice.id} style={{ marginTop: 120 }}>
                        <Image
                            source={choice.img}
                            resizeMode="contain"
                            style={{ width: 330, height: 270, borderRadius: 15 }}
                        />
                        <Text style={{ color: 'white', fontSize: 17, marginTop: 20, fontWeight: 'bold' }}>{choice.name}</Text>
                        <Text style={{ color: 'white', fontSize: 23, marginTop: 20, fontWeight: 'bold' }}>To Pay: ₹{choice.price}</Text>
                        <TouchableOpacity onPress={confirmOrder}>
                            <View style={{ padding: 10, backgroundColor: 'orange', paddingLeft: 20, paddingRight: 20, borderRadius: 5, marginTop: 20 }}>
                                <Text style={{ color: 'black', fontSize: 17, }}>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
                :
                (
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/food2.gif')}
                            resizeMode="contain"
                            style={{ width: 260, height: 350, borderWidth: 100, borderColor: 'gray' }}
                        />
                        <Text style={{ color: 'white', fontSize: 23, marginBottom: 20, marginTop: -30, fontWeight: 'bold' }}>Your cart is empty</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={{ color: 'white', fontSize: 16 }} >Go back to Home</Text>
                        </TouchableOpacity>
                    </View >

                )



            }




 */}



        </View>

    )
}

export default CartScreen