import { createSlice } from '@reduxjs/toolkit'

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find((i) => i._id === item._id)

            if (existItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existItem._id ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            // Items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            // Shipping price - if order is over $100 then free, else $10
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            // Tax price - 15%
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            // Total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2)

            localStorage.setItem('cart', JSON.stringify(state))
        }
    }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer