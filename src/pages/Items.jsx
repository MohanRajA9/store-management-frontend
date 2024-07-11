import { Card, Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/ItemSlice'
const { Meta } = Card

function Items({ item }) {

    const dispatch = useDispatch()



    const handleAddCart = (item) => {
        dispatch(addToCart(item))
        // console.log("Add to cart", item)
    }
    return (
        <div>
            <Card hoverable style={{ width: "250px", marginTop: "40px" }} cover={<img style={{ width: "100%", height: "250px", objectFit: "contain" }} src={item.image} alt={item.name} />} >
                <Meta title={item.name} />
                <h4>Price : Rs.{item.price}</h4>
                <Button type="primary" onClick={() => handleAddCart(item)} >Add to cart</Button>
            </Card>
        </div>
    )
}

export default Items