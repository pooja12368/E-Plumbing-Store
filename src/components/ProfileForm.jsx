import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { apiRequest } from "../libs/request"
import uservalidation from '../validations/uservalidation'

export const ProfileForm=({data})=>{
    const [user,setUser]=useState(data)
    const [submitted,setSubmitted]=useState(false)
    const [errors,setErrors]=useState({})
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        if(e.target.name==='pwd'){
            setUser({...user,'cpwd':e.target.value})   
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(user)
        setErrors(uservalidation(user))         
        setSubmitted(true)      
    }

    useEffect(()=>{
        console.log(errors)        
        if(submitted){
            console.log(user)
            apiRequest.put("customers/"+user?.id,user)
            .then(resp=>{
                console.log(resp)
                toast.success("Profile updated successfully")                
            })
            .catch(error=>console.log("Error",error))            
        }
    },[errors])
    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="form-group form-row">
                <label className="col-sm-4 offset-2 form-control-label">Customer Name</label>
                <div className="col-sm-4">
                    <input type="text" name="name" value={user?.name} onChange={handleInput} className="form-control" />
                    {errors.name && <small className="text-danger float-right">{errors.name}</small>}
                </div>
                
            </div>
            <div className="form-group form-row">
                <label className="col-sm-4 offset-2 form-control-label">City</label>
                <div className="col-sm-4">
                    <input type="text" name="city" value={user?.city} onChange={handleInput} className="form-control" />
                    {errors.city && <small className="text-danger float-right">{errors.city}</small>}
                </div>                        
            </div>
            <div className="form-group form-row">
                <label className="col-sm-4 offset-2 form-control-label">Gender</label>
                <div className="col-sm-4">
                    <select name="gender" value={user?.gender} onChange={handleInput} className="form-control">
                        <option value="">Select Gender</option>
                        <option>Male</option>     
                        <option>Female</option>     
                    </select> 
                    {errors.gender && <small className="text-danger float-right">{errors.gender}</small>}                      
                </div>                        
            </div>
            <div className="form-group form-row">
                <label className="col-sm-4 offset-2 form-control-label">User Id</label>
                <div className="col-sm-4">
                    <input type="text" name="userid" readOnly value={user?.userid} className="form-control" />
                    {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
                </div>
                
            </div>
            <div className="form-group form-row">
                <label className="col-sm-4 offset-2 form-control-label">Phone</label>
                <div className="col-sm-4">
                    <input type="text" maxLength="10" name="phone" value={user?.phone} onChange={handleInput} className="form-control" />
                    {errors.phone && <small className="text-danger float-right">{errors.phone}</small>}
                </div>
                
            </div>
            <div className="form-group form-row">
                <label className="col-sm-4 offset-2 form-control-label">Password</label>
                <div className="col-sm-4">
                    <input type="password" name="pwd" value={user?.pwd} onChange={handleInput} className="form-control" />
                    {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
                </div>
            </div>            
            <button className="btn btn-primary">Update Profile</button>
            </form>
        </>
    )
}