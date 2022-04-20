import React, { createContext, useReducer, useContext } from 'react'
import { cartReducer } from './Reducers';

const Cart = createContext();

function CartContext({ children }) {
    const RecommendedFood = [
        {
            id: 1,
            name: 'Chilli Paneer',
            path: require('../assets/chilli-paneer.jpg'),
            price: 70
        },
        {
            id: 2,
            name: 'Drunken Tofu Noodles',
            path: require('../assets/drunken-tofu-noodles.jpeg'),
            price: 170
        },
        {
            id: 3,
            name: 'American Lo Mein',
            path: require('../assets/american-lo-mein.jpg'),
            price: 170
        },
        // {
        //     id: 3,
        //     name: 'American Lo Mein',
        //     image: require("../assets/american-lo-mein.jpg"),
        //     price: 90
        // }
    ]
    const BestSellersFood = [
        {
            id: 1,
            name: 'American Lo Mein',
            path: require('../assets/american-lo-mein.jpg'),
            price: 170
        },
        {
            id: 2,
            name: 'Chilli Paneer',
            path: require('../assets/chilli-paneer.jpg'),
            price: 70
        },
        {
            id: 3,
            name: 'Drunken Tofu Noodles',
            path: require('../assets/drunken-tofu-noodles.jpeg'),
            price: 170
        },

    ]
    const TodaysBestFood = [
        {
            id: 1,
            name: 'Penne Alfredo',
            path: require('../assets/penne-alfredo.jpg'),
            price: 170
        },
        {
            id: 2,
            name: 'Hakka Noodles',
            path: require('../assets/veg-hakka-noodles.jpg'),
            price: 70
        },
        {
            id: 3,
            name: 'Mac N Cheese',
            path: require('../assets/mac-n-cheese.jpg'),
            price: 170
        },

    ]
    const [state, dispatch] = useReducer(cartReducer, {
        RecommendedFood: RecommendedFood,
        BestSellersFood: BestSellersFood,
        TodaysBestFood: TodaysBestFood,
        cart: []
    });

    return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>
}

export default CartContext

export const CartState = () => {
    return useContext(Cart)
}