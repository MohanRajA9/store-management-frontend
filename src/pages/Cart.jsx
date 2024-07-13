import React, { useEffect, useState } from 'react'
import { Button, Modal, Table, Form, Input, Select, message } from 'antd'
import { useSelector } from 'react-redux'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




function Cart() {
    const cartItems = useSelector((state) => state.itemShop.cartItems)
    console.log(cartItems)
    const [subTotal, setSubTotal] = useState(0)
    const [billChargeModal, setBillChargeModal] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        let temp = 0
        cartItems.forEach((items) => {
            temp = temp + items.price
        })
        setSubTotal(temp)
    }, [cartItems])
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image) => {
                <image src={image} alt="" />
            }
        },
        {
            title: "Price",
            dataIndex: "price"
        }
    ]
    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subTotal,
            cartItems,
            tax:((subTotal / 100) * 2).toFixed(2),
            totalAmount:(subTotal + (subTotal / 100) * 2),
            userId: JSON.parse(localStorage.getItem("user_data"))._id
        }
        axios.post(`${API}/bill/charge-bill`,reqObject)
        .then(()=>{
            message.success("Bill added successfully")
            navigate("/bills")
        })
    }
    return (
        <div>
            <Table dataSource={cartItems} columns={columns} bordered pagination={false} ></Table>
            <div className='d-flex justify-content-end' >
                <div>
                    <h3>SUB TOTAL : <b>Rs.{subTotal}</b></h3>
                </div>
            </div>
            <Button type='primary' onClick={() => setBillChargeModal(true)} >Charge Bill</Button>
            <Modal title='Charge Bill' open={billChargeModal} onCancel={() => { setBillChargeModal(false) }} footer={false} >
                <Form onFinish={onFinish} >
                    <Form.Item name="customerName" label="Customer Name" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="customerPhoneNumber" label="Customer Phone Number" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="paymentMode" label="Payment Mode" >
                        <Select>
                            <Select.Option value="cash" >CASH</Select.Option>
                            <Select.Option value="card" >CARD</Select.Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <h3>SubTotal : <b>Rs.{subTotal}</b> </h3>
                        <h5>Tax : <b>Rs.{((subTotal / 100) * 2).toFixed(2)}</b></h5>
                        <h5>Grand Total : <b>{(subTotal + (subTotal / 100) * 2)}</b></h5>
                    </div>
                    <div className="d-flex justify-content-end" >
                        <Button htmlType='submit' type='primary' >Generate Bill</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Cart