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


              <View key={choice.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 120 }}>
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
            </>
          )