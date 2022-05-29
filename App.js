import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Starter from './screens/Starter';
import Login from './screens/Login';
import Signup from './screens/Signup';
import StackNavigator from './StackNavigator';
import 'react-native-gesture-handler';
import React, { useState } from "react"
import { LoginContext } from './Contexts/LoginContext';
import CartContext from './Contexts/CartContext';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);
  const [staff, setStaff] = useState(null);
  const [admin, setAdmin] = useState(null);

  return (
    <LoginContext.Provider value={{ user, setUser, staff, setStaff, admin, setAdmin }}>
      <CartContext>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </CartContext>
    </LoginContext.Provider>

  );
}

