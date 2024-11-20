import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cartItem',
    initialState:[],
    reducers:{
        addToCart :(state,actionByComponent)=>{
            const existingProduct = state.find(item=>item.id==actionByComponent.payload.id)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
                const remaningProduct = state.filter(item=>item.id!=existingProduct.id)
                state = [...remaningProduct,existingProduct]
            }else{
                state.push({...actionByComponent.payload,quantity:1,totalPrice:actionByComponent.payload.price})
            }
        },
        incrementQuantity :(state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
            const remaningProduct = state.filter(item=>item!=existingProduct.id)
            state = [...remaningProduct,existingProduct]
        },
        removeCartItem : (state,actionByCart)=>{
            return state.filter(item=>item.id!=actionByCart.payload)
        },
        decrementQuantity :(state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity--
            existingProduct.totalPrice = existingProduct.quantity*existingProduct.price
            const remaningProduct = state.filter(item=>item!=existingProduct.id)
            state = [...remaningProduct,existingProduct]
        },
        emptyCart : (state)=>{
            return state = []
        }
    }
})

export const {addToCart,incrementQuantity,removeCartItem,decrementQuantity,emptyCart} = cartSlice.actions
export default cartSlice.reducer