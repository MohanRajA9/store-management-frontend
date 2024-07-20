import React, { useEffect } from 'react'
import { API } from '../global'
import axios from 'axios'
import { Button } from 'antd'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { useNavigate } from 'react-router-dom'

function Bill() {
    const navigate = useNavigate()
    const componentRef = React.useRef(null)
    const [billData, setBillData] = React.useState([])
    const getAllBills = () => {
        axios.get(`${API}/bill/get-bill`)
            .then((res) => {
                console.log(res.data)
                setBillData(res.data)
            })
    }
    useEffect(() => {
        getAllBills()
    }, [])
    console.log(billData)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    // const reactToPrintContent = React.useCallback(() => {
    //     return componentRef.current
    // }, [componentRef.current])
    return (
        <div>
            <h1>Bill Details</h1>
            <table className='table table-bordered' ref={componentRef}>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Phone Number</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.map((item) => {
                        return (
                            <tr key={item._id} >
                                <td>{item.customerName}</td>
                                <td>{item.customerPhoneNumber}</td>
                                <td>{item.subTotal}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='billButtons' >
                <Button type='primary' onClick={()=>{navigate("/home")}} >Home</Button>
                <Button type='primary' onClick={handlePrint} >Print Bill</Button>
            </div>
            
            {/* <ReactToPrint
                content={reactToPrintContent}
                documentTitle='awesomeFileName'
            /> */}
        </div>
    )
}

export default Bill