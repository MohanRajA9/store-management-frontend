import React from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { API } from '../global.js'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Signup() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values)
        axios.post(`${API}/user/register`, values)
            .then((res) => {
                console.log(res)
                message.success("User Created Successfully")
                navigate("/")
            }).catch((error) => {
                message.error("invalid Credentials")
                console.log(error)
            })

    }
    return (
        <div>
            <Row>
                <Col lg={12} xs={22} >
                    <Form onFinish={onFinish} >
                        <h1>Store Management</h1>
                        <h3>Signup</h3>
                        <Form.Item name="name" label="Name" >
                            <Input id='name' placeholder='John' />
                        </Form.Item>
                        <Form.Item name='userId' label='User ID' >
                            <Input id='userId' placeholder='1598' />
                        </Form.Item>
                        <Form.Item name='password' label='password' >
                            <Input id='password' placeholder='John@123' />
                        </Form.Item>
                        <div className='loginButtons' >
                            <Button htmlType='submit' type='primary' >Signup</Button>
                            <Button type='primary' onClick={()=>{navigate("/")}} >Login</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Signup