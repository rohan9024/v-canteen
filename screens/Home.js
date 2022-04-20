import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Drawer from 'react-native-drawer-menu';
import { CartState } from '../Contexts/CartContext';
import { LoginContext } from '../Contexts/LoginContext';
import { storage } from '../firebase';

export default function App() {

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

  async function order(){

  }

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


  return (


    <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.container}>
      {
        show || cart ?
          (
            <>

              {
                cart ?
                  !choice ? (
                    <>
                      <View style={{ marginTop: 50, marginLeft: 300 }}>

                        <TouchableOpacity onPress={() => setCart(false)}>
                          <Image
                            source={require('../assets/close.png')}
                            resizeMode="contain"
                            style={{ width: 20, height: 20, tintColor: 'orange' }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 120 }}>
                        <Image
                          source={require('../assets/food2.gif')}
                          resizeMode="contain"
                          style={{ width: 260, height: 350, borderWidth: 100, borderColor: 'gray' }}
                        />
                        <Text style={{ color: 'white', fontSize: 23, marginBottom: 20, marginTop: -30, fontWeight: 'bold' }}>Your cart is empty</Text>
                        <Text style={{ color: 'white', fontSize: 16 }}>Go back to Home</Text>
                      </View>
                    </>

                  )
                    : (
                      <>
                        <View style={{ marginTop: 50, marginLeft: 300 }}>

                          <TouchableOpacity onPress={() => setCart(false)}>
                            <Image
                              source={require('../assets/close.png')}
                              resizeMode="contain"
                              style={{ width: 20, height: 20, tintColor: 'orange' }}
                            />
                          </TouchableOpacity>
                        </View>
                        {/* {
                          choice.map((per) => (
                            <View key={per.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 120 }}>
                              <Image
                                source={per.img}
                                resizeMode="contain"
                                style={{ width: 330, height: 270, borderRadius: 15 }}
                              />
                              <Text style={{ color: 'white', fontSize: 23, marginBottom: 20, marginTop: -30, fontWeight: 'bold' }}>{per.id}</Text>
                              <Text style={{ color: 'white', fontSize: 16 }}>
                                {per.name}</Text>
                            </View>
                          ))
                        } */}

                        <View key={choice.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 120 }}>
                          <Image
                            source={choice.img}
                            resizeMode="contain"
                            style={{ width: 330, height: 270, borderRadius: 15 }}
                          />
                          <Text style={{ color: 'white', fontSize: 17, marginTop: 20, fontWeight: 'bold' }}>{choice.name}</Text>
                          <Text style={{ color: 'white', fontSize: 23, marginTop: 20, fontWeight: 'bold' }}>To Pay: ₹{choice.price}</Text>
                          <TouchableOpacity onPress={order}>
                            <View style={{ padding: 10, backgroundColor: 'orange', paddingLeft: 20, paddingRight: 20, borderRadius: 5, marginTop: 20 }}>
                              <Text style={{ color: 'black', fontSize: 17, }}>Confirm</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>
                    )
                  : (
                    <>
                      <View style={{ marginTop: 50, marginLeft: 300 }}>

                        <TouchableOpacity onPress={() => setShow(false)}>
                          <Image
                            source={require('../assets/close.png')}
                            resizeMode="contain"
                            style={{ width: 20, height: 20, tintColor: 'orange' }}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={{ marginLeft: 100, marginTop: 120 }}>
                        {/* <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: 'bold' }}>Signed in as {user.username}</Text> */}
                        <Text style={{ fontSize: 20, color: 'white', fontSize: 20, fontWeight: 'bold' }}>Signed in as yash</Text>
                      </TouchableOpacity>
                      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 100 }}>

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
                    </>

                  )
              }

            </>

          ) : (

            <View style={styles.container} >
              <View style={{ alignItems: 'center', marginTop: 40 }}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Image
                      source={require('../assets/menu.png')}
                      resizeMode="contain"
                      style={{ width: 25, height: 25, marginRight: 60, tintColor: 'orange' }}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>V-canteen</Text>
                  <TouchableOpacity onPress={() => setCart(true)}>
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
                            <TouchableOpacity onPress={() => setchoice((prevState) => ({ ...prevState, id: food.id, img: food.path, name: food.name, price: food.price }))}>
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
                            <TouchableOpacity>
                              <Image
                                source={require('../assets/minus.png')}
                                resizeMode="contain"
                                style={{ width: 15, height: 15, marginRight: 20, tintColor: 'orange' }}
                              />
                            </TouchableOpacity>
                            <View>
                              <Text style={{ marginRight: 20, color: 'orange', fontSize: 20 }}>0</Text>
                            </View>
                            <TouchableOpacity>
                              <Image
                                source={require('../assets/plus.png')}
                                resizeMode="contain"
                                style={{ width: 15, height: 15, tintColor: 'orange' }}
                              />
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
                            <TouchableOpacity>
                              <Image
                                source={require('../assets/minus.png')}
                                resizeMode="contain"
                                style={{ width: 15, height: 15, marginRight: 20, tintColor: 'orange' }}
                              />
                            </TouchableOpacity>
                            <View>
                              <Text style={{ marginRight: 20, color: 'orange', fontSize: 20 }}>0</Text>
                            </View>
                            <TouchableOpacity>
                              <Image
                                source={require('../assets/plus.png')}
                                resizeMode="contain"
                                style={{ width: 15, height: 15, tintColor: 'orange' }}
                              />
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
          )
      }
    </ScrollView >





  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});