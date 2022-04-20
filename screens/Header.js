import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc';

function Header() {
    return (
        <View style={tw`flex-row mt-10 justify-between`}>
            <View>
                <Text style={tw`text-white ml-5 mb-3 text-sm`}>Good morning! </Text>
                <Text style={tw`text-white font-bold ml-5 text-xl`}>Username</Text>
            </View>
            <TouchableOpacity>
                <View style={tw`mr-5 bg-red-400 rounded-lg w-28 h-8 justify-center `}>
                    <Text style={tw`text-white text-center`}>Claim rewards! </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header
