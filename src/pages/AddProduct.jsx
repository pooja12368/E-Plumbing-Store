import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../libs/request";
import productvalidation from "../validations/productvalidation";

function AddProduct(){
    const [cats,setcats]=useState([])
    const [product,setProduct]=useState({
        "pname":"",
        "category":"",
        "price":"",
        "descr":""
    })
    const [errors,setErrors]=useState({})
    const [selectedPhoto,setSelectedPhoto]=useState(null)
    const [submitted,setSubmitted]=useState(false)
    const navigate=useNavigate()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleFileInput=e=>{
        setSelectedPhoto(e.target.files[0])
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }
    useEffect(()=>{
        apiRequest.get('categories') 
        .then(resp=>setcats(resp.data))
        .catch(error=>toast.error(error))
    },[])

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            const formData=new FormData()
            formData.append("pic",selectedPhoto)
            formData.append("pname",product.pname)
            formData.append("category",product.category)
            formData.append("price",product.price)
            formData.append("descr",product.descr)
            console.log(product)
            apiRequest.post("products",formData)
            .then(resp=>{
                let result=resp.data.data;
                console.log(result) 
                toast.success("Product saved successfully")               
                navigate("/products")
            })
            .catch(error=>{
                console.log("Error",error);
                toast.error("Error saving product")
            })            
        }
    },[errors])
    return (
        <div className="container">
                <div className="card shadow bg-transparent text-white">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <h4 className="text-center p-2">
                                Add Product Form
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Product Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="pname" value={product.pname} onChange={handleInput} className="form-control" />
                                    {errors.pname && <small className="text-danger float-right">{errors.pname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="category" value={product.category} onChange={handleInput} className="form-control">
                                        <option value="">Select Category</option>
                                        {cats.filter(x=>x.isactive).map(x=>(
                                            <option value={x.id}>{x.catname}</option>
                                        ))}
                                    </select>   
                                    {errors.pcat && <small className="text-danger float-right">{errors.pcat}</small>}                    
                                </div>                        
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Price</label>
                                <div className="col-sm-8">
                                    <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                                    {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Description</label>
                                <div className="col-sm-8">
                                    <input name="descr" value={product.descr} onChange={handleInput} className="form-control"/>  
                                    {errors.descr && <small className="text-danger float-right">{errors.brand}</small>}
                                </div>                                
                            </div>

                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Photo</label>
                                <div className="col-sm-8">
                                    <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />                                    
                                </div>                                
                            </div>
                            
                            <button className="btn btn-primary float-right">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
                </div>
    )
}

export default AddProduct;
