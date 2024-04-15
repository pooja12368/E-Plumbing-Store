import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest,SERVER_URL } from "../libs/request";

function Products(){
    const [products,setProducts]=useState([])
    useEffect(()=>{
        loadData()
    },[])

    const loadData=()=>{
        apiRequest.get("products")
        .then(resp=>{
            console.log(resp.data)
            setProducts(resp.data.data)
            console.log(products)
        })
    }

    const deleteProduct = (prodid)=>{
        let resp=window.confirm('Are you sure to delete this product ?');
        if(resp){
            apiRequest.delete("products/"+prodid)
            .then(resp=>{
                toast.success("Product deleted successfully")
                loadData()
            })            
        }
    }
    
    return (
        <div className="container">
            <div className="card shadow bg-transparent text-white">
                <div className="card-body">
                    <Link to='/add-product' className="btn btn-primary btn-sm float-right">Add New</Link>                    
            <h4>My Products</h4>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>                                
                    </tr>
                </thead>
                <tbody>
                {products.map(x=>(
                    <tr key={x.prodid}>
                        <td><img width="100" src={SERVER_URL+x.photo} className="img-thumnail" />{x.pname}</td>
                        <td>{x.category.catname}</td>
                        <td>{x.descr}</td>
                        <td>{x.price}</td>
                        <td>
                            <Link to={"/edit/"+x.prodid} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <button onClick={()=>deleteProduct(x.prodid)} className="btn btn-danger btn-sm">Delete</button>
                        </td>                                
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
        </div>
            </div>
    )
}

export default Products;