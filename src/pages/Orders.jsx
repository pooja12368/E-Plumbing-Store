import { useEffect, useState } from "react";
import { apiRequest,SERVER_URL } from "../libs/request";

function Orders(){
    const [orders,setOrders]=useState([])
    const [show,setShow]=useState(false)
    const [details,setDetails]=useState([])

    useEffect(()=>{
        apiRequest.get("orders")
        .then(resp=>{
            console.log(resp.data)
            setOrders(resp.data.data)
        })
    },[]);

    const showDetails=(orderid)=>{
        const items=orders.filter(x=>x.orderid===orderid)
        console.log(items[0].details)
        setDetails(items[0].details)           
        setShow(true)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-7">
                <h4 className="p-2 text-center text-white">All Orders</h4>
                <table className="table table-bordered table-sm table-light table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                            <th>Customer</th>
                            <th>Action</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(x=>(
                            <tr key={x.orderid}>
                                <td>{x.orderid}</td>
                                <td>{x.orderDate}</td>
                                <td>&#8377; {x.payment.amount}</td>
                                <td>{x.customer.name}</td>
                                <td><button onClick={e=>showDetails(x.orderid)} className="btn btn-primary btn-sm">Show Details</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>  
                </div>
                <div className="col-sm-5">
                    {show ? <>
                    <h4 className="p-2">Order Details</h4>
                    <table className="table table-bordered table-light table-hover table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                        {details.map((x,index) => (
                                <tr key={index}>
                                    <td>{x.product?.prodid}</td>
                                    <td><img className="mr-2 float-left" src={SERVER_URL+x.product?.photo} 
                                    style={{width:"60px",height:"60px"}} />
                                    {x.product?.pname}<br/>
                                    ({x.product?.category?.catname})
                                    </td>
                                    <td>{x.product?.price}</td>
                                    <td>{x.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </> : ''}
                </div>
            </div>                
                              
        </div>                    
    )
}

export default Orders;