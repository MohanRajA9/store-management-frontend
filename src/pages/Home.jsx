import React, { useEffect, useState } from 'react'
import {API} from '../global'
import axios from 'axios'
import Items from './Items'


function Home() {
    const [itemData, setItemData] = useState([])
    useEffect(()=>{
        axios.get(`${API}/items/get-items`)
        .then((res)=>{
            setItemData(res.data)
        })
    },[])
    return (
        <div className="item-display" >
            {itemData.map((item)=>(
                <Items key={item._id} item={item} />
            ))}
        </div>
    )
}

export default Home