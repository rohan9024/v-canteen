import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useContext } from "react";
import { Text, View } from 'react-native';
import { LoginContext } from './Contexts/LoginContext';
import Home from "./screens/Home";
import Login from "./screens/Login";
import Order from './screens/Order';
import Rewards from './screens/Rewards';
import Signup from './screens/Signup';
import Starter from './screens/Starter';
import WaitScreen from './screens/WaitScreen';
import StaffScreen from './screens/StaffScreen';
import StaffLogin from './screens/StaffLogin';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user, staff } = useContext(LoginContext);

    return (
        <Stack.Navigator initialRouteName='Starter'>

            {user && (
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="WaitScreen" component={WaitScreen} options={{ headerShown: false }} />
                </>
            )}
            {staff && (
                <>
                    <Stack.Screen name="StaffScreen" component={StaffScreen} options={{ headerShown: false }} />
                </>
            )}
      
            {
                !user && !staff && (
                    <>
                        <Stack.Screen name="Starter" component={Starter} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="StaffLogin" component={StaffLogin} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    </>
                )
            }




        </Stack.Navigator>
    )
}

export default StackNavigator;