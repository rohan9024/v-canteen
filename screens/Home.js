import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Drawer from 'react-native-drawer-menu';
import { CartState } from '../Contexts/CartContext';
import { LoginContext } from '../Contexts/LoginContext';
import { db, storage } from '../firebase';


export default function App() {
  const [name, setName] = useState("")
  const [Recommended, setRecommended] = useState(true);
  const [BestSeller, setBestSeller] = useState(false);
  const [TodaysBest, setTodaysBest] = useState(false);
  const [show, setShow] = useState(false)
  const [cart, setCart] = useState(false)
  const { user, setUser } = useContext(LoginContext);
  const [url, setUrl] = useState('');
  const [choice, setchoice] = useState();
  const { state, dispatch } = CartState()

  const scaleBS = useRef(new Animated.Value(0)).current;
  const scaleR = useRef(new Animated.Value(0)).current;
  const scaleT = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(scaleBS, {
      toValue: BestSeller ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [BestSeller]);

  useEffect(() => {
    Animated.timing(scaleR, {
      toValue: Recommended ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [Recommended]);

  useEffect(() => {
    Animated.timing(scaleT, {
      toValue: TodaysBest ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [TodaysBest]);


  function confirmOrder() {
    const addOrderStaff = async () => {
      const docRef = await addDoc(collection(db, "orders"), {
        name: choice.name,
        price: choice.price,
        confirm: false,
        userID: user.id,
        username: user.name,
      });

      alert("Order Received successfully");
      navigation.navigate('WaitScreen', { orderID: docRef.id, price: choice.price, confirm: false })
    }
    const addOrderUser = async () => {
      const userRef = doc(db, 'users', user.id);
      setDoc(userRef, { confirm: false }, { merge: true });
    }

    addOrderUser();
    addOrderStaff();
  }

  return (


    <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.container}>

      <View style={styles.container} >
        <View style={{ alignItems: 'center', marginTop: 40 }}>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
              <Image
                source={require('../assets/menu.png')}
                resizeMode="contain"
                style={{ width: 25, height: 25, marginRight: 60, tintColor: 'orange' }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>V-canteen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen', choice)}>
              {/* <TouchableOpacity onPress={() => console.log(choice)}> */}
              <Image
                source={require('../assets/cart.png')}
                resizeMode="contain"
                style={{ width: 25, height: 25, marginLeft: 60, tintColor: 'orange' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 330, height: 90, backgroundColor: 'orange', borderRadius: 15 }}>
            {/* <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Welcome Rohit!</Text> */}
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>20% Discount on first order</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Explore Dishes</Text>
            <Image
              source={require('../assets/right.png')}
              resizeMode="contain"
              style={{ width: 25, height: 25, marginLeft: 60, marginTop: 10, tintColor: 'orange' }}
            />
          </View>

          <View style={{ marginTop: 30 }} >
            <ScrollView horizontal={true} style={{ maxHeight: 300 }}>
              <View style={{ marginRight: 10 }}>
                <Image
                  source={require('../assets/noodle-rice.webp')}
                  resizeMode="contain"
                  style={{ width: 355, height: 300 }}
                />
              </View>
              <View style={{ marginRight: 30 }}>
                <Image
                  source={require('../assets/biryani.webp')}
                  resizeMode="contain"
                  style={{ width: 355, height: 300 }}
                />
              </View>
              <View>
                <Image
                  source={require('../assets/frankie.webp')}
                  resizeMode="contain"
                  style={{ width: 355, height: 300 }}
                />
              </View>
            </ScrollView>
          </View>
          <ScrollView horizontal={true} style={{ marginTop: 20, maxHeight: 40, marginLeft: 20, marginRight: 20 }}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
              setRecommended(true);
              setBestSeller(false);
              setTodaysBest(false)
            }}>
              <Text style={Recommended ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'gray' }}>Recommended</Text>
              <Animated.View
                style={{
                  width: 140,
                  height: 3,
                  backgroundColor: 'orange',
                  transform: [{ scaleX: scaleR }]
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
              setRecommended(false);
              setBestSeller(true);
              setTodaysBest(false)
            }}>
              <Text style={BestSeller ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'gray' }}>Best Sellers</Text>
              <Animated.View
                style={{
                  width: 100,
                  height: 3,
                  backgroundColor: 'orange',
                  transform: [{ scaleX: scaleBS }]
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
              setRecommended(false);
              setBestSeller(false);
              setTodaysBest(true)
            }}>
              <Text style={TodaysBest ? { fontSize: 20, color: 'white' } : { fontSize: 20, color: 'gray' }}>Today's Best</Text>
              <Animated.View
                style={{
                  width: 110,
                  height: 3,
                  backgroundColor: 'orange',
                  transform: [{ scaleX: scaleT }]
                }}
              />
            </TouchableOpacity>

          </ScrollView>
          {
            Recommended ?
              state.RecommendedFood.map((food) => (
                <View key={food.id}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={food.path}
                      resizeMode="contain"
                      style={{ width: 330, height: 270, borderRadius: 15 }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 100 }}>{food.name}</Text>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>₹{food.price}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                      <TouchableOpacity onPress={() => setchoice((prevState) => [{ ...prevState, name: food.name }])}>
                        <View style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10 }}>
                          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Add to Cart</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
              : (
                <Text style={{ display: 'none' }}></Text>
              )
          }
          {
            BestSeller ?
              state.BestSellersFood.map((food) => (
                <View key={food.id}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={food.path}
                      resizeMode="contain"
                      style={{ width: 330, height: 270, borderRadius: 15 }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 100 }}>{food.name}</Text>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>₹{food.price}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                      <TouchableOpacity onPress={() => setchoice((prevState) => [{ ...prevState, name: food.name }])}>
                        <View style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10 }}>
                          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Add to Cart</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
              : (
                <Text style={{ display: 'none' }}></Text>
              )
          }
          {
            TodaysBest ?
              state.TodaysBestFood.map((food) => (
                <View key={food.id}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={food.path}
                      resizeMode="contain"
                      style={{ width: 330, height: 270, borderRadius: 15 }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 100 }}>{food.name}</Text>
                      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>₹{food.price}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                      <TouchableOpacity onPress={() => setchoice((prevState) => ({ ...prevState, name: food.name }))}>
                        <View style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10 }}>
                          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Add to Cart</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
              : (
                <Text style={{ display: 'none' }}></Text>
              )
          }
        </View>
      </View >
    </ScrollView >





  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});