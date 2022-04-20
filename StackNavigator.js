import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useContext } from "react";
import { Text, View } from 'react-native';
import { LoginContext } from './Contexts/LoginContext';
import AdminLogin from './screens/AdminLogin';
import Home from "./screens/Home";
import Login from "./screens/Login";
import Order from './screens/Order';
import Rewards from './screens/Rewards';
import Signup from './screens/Signup';
import Starter from './screens/Starter';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user, setUser } = useContext(LoginContext);

    return (
        <Stack.Navigator initialRouteName='Starter'>

            {user ? (
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            )
                : (
                    <>
                        <Stack.Screen name="Starter" component={Starter} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

                        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />

                    </>
                )
            }

        </Stack.Navigator>
    )
}

export default StackNavigator;