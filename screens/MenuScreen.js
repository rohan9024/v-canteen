import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MenuScreen = () => {

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ marginTop: 50, marginLeft: 300 }}>

                <TouchableOpacity onPress={() => setShow(false)}>
                    <Image
                        source={require('../assets/close.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: 'orange' }}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 80, marginTop: 120 }}>
                {/* <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: 'bold' }}>Signed in as {user.username}</Text> */}
                <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: 'bold' }}>Signed in as gewjfwb</Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>

                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Text style={{ fontSize: 20, color: 'white' }}>View Order</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PrevOrders')}>
                    <Text style={{ fontSize: 20, marginTop: 30, color: 'white' }}>View Previous Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SchedulePost')}>
                    <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 70, color: 'white' }}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MenuScreen