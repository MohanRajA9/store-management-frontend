import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cartItems: []
}

const itemSlice = createSlice({
    name:"item",
    initialState,
    reducers:{
        //actions
        addToCart:(state,action) => {
            let newData = state.cartItems.push(action.payload)
            // console.log(action)
            // console.log("newData",newData)
            
        }
    }
})

export const {addToCart} = itemSlice.actions

export default itemSlice.reducer

