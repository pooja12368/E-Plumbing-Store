import TopSlider from "../components/TopSlider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import { toast } from "react-toastify";
import Product from "../components/Product";
import { apiRequest,SERVER_URL } from "../libs/request";

export default function Home(){
    const [products,setProducts]=useState([])
    const {pcat}=useParams()
    const state=useSelector((state)=>state);
    const [item,setItem]=useState({})
    const [qty,setQty]=useState(1)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    console.log("server",SERVER_URL)
    const [showDialog,setShowDialog]=useState("modal fade")
    const [display,setDisplay]=useState("none")
    
    const showModal=(prod)=>{
        console.log("Child call parent")
        setShowDialog("modal fade show")
        setDisplay("block")
        setItem(prod)
    }

    const checkItem =(prodid)=>{
        return state.cart.findIndex(x=>x.prodid===prodid)<0
    }

    const closeDialog=()=>{        
        setShowDialog("modal fade")
        setDisplay("none")
    }

    const loadDataFromServer=()=>{
        apiRequest.get("products")
            .then(resp=>{                
                setProducts(resp.data.data)                
                console.log(products)
            })
    }

    useEffect(()=>{
        console.log(pcat)
        if(pcat !== undefined){
            apiRequest.get("products/cats/"+pcat)
            .then(resp=>{
                console.log(resp.data)
                setProducts(resp.data)
                console.log(products)
            })
        }
        else {
            loadDataFromServer()
        }
    },[pcat])
    const addToCart=item=>{  
        if(sessionStorage.getItem("userid")==null){
            toast.error("Please login first to buy product")
            navigate("/clogin")
        }
        else if(sessionStorage.getItem("role")!=="Customer"){
            toast.error("Only customer can buy product")
        }      
        else{            
            if(checkItem(item.prodid))
            {     
                showModal() 
                setDisplay("none")
                setShowDialog("modal fade") 
                item.qty=qty         
                setQty(1)
                dispatch({type:'AddItem',payload:item})
                toast.success("Item added to cart successfully")
            }
            else{                
                toast.error("Item already in cart")
            }
        }
    }

    return (
        <>
        <TopSlider/>
        <div className="container-fluid" style={{width:"92%"}}>
            <div className="card shadow bg-transparent">
                <div className="card-body">
                    <div className="row">                
                    {products.map(x=>(
                        <Product key={x.prodid} x={x} showModal={showModal} />                        
                    ))}                    
                    </div>
                </div>
            </div> 
            {display=="block"?( 
            <div className={showDialog} style={{zIndex:"1000",display:display}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add to Cart</h5>
                            <button onClick={closeDialog} className="close">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex">
                                <img src={SERVER_URL+item.photo} style={{width:"200px"}}/>
                                <div className="ml-3">
                                    <h4 className="p-2 text-warning">{item.pname}</h4>
                                    <h5 className="px-2">Category: {item.category.catname}</h5>
                                    <h6 className="px-2">{item.descr}</h6>
                                    <h5 className="px-2">Price: &#8377; {item.price}</h5>
                                    <input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={e=>addToCart(item)} className="btn btn-warning btn-sm">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>) : ""}
        </div>
        </>
    )
}