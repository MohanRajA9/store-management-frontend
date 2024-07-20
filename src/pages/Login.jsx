import React from 'react'
import { Row, Col, Form, Input, Button, message } from "antd"
import { API } from '../global'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values)
        axios.post(`${API}/user/login`, values)
            .then((res) => {
                console.log(res)
                message.success("Login successfull")
                localStorage.setItem("user_data", JSON.stringify(res.data.user))
                navigate("/home")
            }).catch((error) => {
                message.error("invalid credentials")
            })
    }
    return (
        <div>
            <Row>
                <Col lg={8} xs={22} >
                    <Form onFinish={onFinish} >
                        <h1 className="text-center" >Store Management</h1>
                        <h3>Login</h3>

                        <Form.Item name="userId" label="User ID" >
                            <Input id="username" placeholder="1" />
                        </Form.Item>

                        <Form.Item name="password" label="Password" >
                            <Input id="password" placeholder="jack@123" />
                        </Form.Item>

                        <div className='loginButtons' >
                            <Button type='primary' onClick={()=>{navigate("/signup")}} >Signup</Button>
                            <Button htmlType="submit" type="primary" >Login</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login