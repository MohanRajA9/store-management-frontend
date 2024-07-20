import React, { useEffect, useState } from 'react'
import { API } from '../global'
import axios from 'axios'
import Items from './Items'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeCartItems } from '../redux/ItemSlice.js'
import { useDispatch } from 'react-redux'
import '../App.css'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [itemData, setItemData] = useState([])
    const cartItems = useSelector((state) => state.itemShop.cartItems)
    console.log(cartItems)

    useEffect(() => {
        axios.get(`${API}/items/get-items`)
            .then((res) => {
                setItemData(res.data)
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('cart-items', JSON.stringify(cartItems))
    }, [cartItems])

    const logout = () => {
        localStorage.removeItem("user_data")
        localStorage.removeItem("cart-items")
        dispatch(removeCartItems())
        navigate("/")
    }
    const clearCart = () => {
        dispatch(removeCartItems())
    }
    return (
        <div>

            <div className='headForHome' >
                <div className='cartButtons' >
                    <button onClick={logout} type="button" className="btn btn-primary position-relative" >
                        Logout
                    </button>
                </div>


                <div className='cartButtons' >
                    <button className="btn btn-primary position-relative" onClick={clearCart} >Clear Cart</button>
                    <button onClick={() => navigate("/cart")} type="button" className="btn btn-primary position-relative">
                        Cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartItems.length}
                        </span>
                    </button>
                </div>

            </div>

            <div className="item-display" >
                {itemData.map((item) => (
                    <Items key={item._id} item={item} />
                ))}
            </div>
        </div>

    )
}

export default Home