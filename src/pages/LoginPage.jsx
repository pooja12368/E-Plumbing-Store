import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../libs/request"
import loginvalidation from '../validations/loginvalidation'

export default function LoginPage(){
    const dispatch=useDispatch()
    const [user,setUser]=useState({
        "userid":"",
        "pwd":""
    })
    const [submitted,setSubmitted]=useState(false)
    const [errors,setErrors]=useState({})
    const [errmsg,setErrmsg]=useState()
    const navigate=useNavigate()

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(loginvalidation(user))    
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            console.log(user)
            apiRequest.post("admin/validate",user)
            .then(resp=>{
                let result=resp.data.data;
                console.log(resp.data.data)
                sessionStorage.setItem("userid",result.userid)
                sessionStorage.setItem("uname",result.uname)
                sessionStorage.setItem("role",result.role)
                sessionStorage.setItem("id",result.id)
                dispatch({type:'IsLoggedIn'})
                navigate("/profile")
            })
            .catch(error=>{
                console.log("Error",error);
                setErrmsg("Invalid username or password..!!")
            })            
        }
    },[errors])


    return (
    <div className="container">
            <div className="card shadow bg-transparent mt-3 text-white">
        <div className="card-body" style={{backgroundImage:"url('assets/bglogin.jpg')",backgroundSize:"100% 100%",height:"80vh"}}>
        <div className="row">
            <div className="col-sm-4 offset-1 py-5">
                <h4 className="text-center p-2">
                    Login Form
                </h4>
                <form onSubmit={handleSubmit} className="mt-4">                 
                <div className="form-group">
                    <label>User Id</label>
                        <input type="text" name="userid" placeholder="User ID" value={user.userid} onChange={handleInput} className="form-control" />
                        {errors.userid && <small className="text-danger d-inline-block">{errors.userid}</small>}                    
                </div>                    
                <div className="form-group mt-3">
                    <label>Password</label>
                        <input type="password" name="pwd" placeholder="Password" value={user.pwd} onChange={handleInput} className="form-control" />
                        {errors.pwd && <small className="text-danger d-inline-block">{errors.pwd}</small>}
                    
                </div>                    
                <button className="btn btn-primary mt-4">Login Now</button>
                </form>
                <div className="clearfix"></div>
                {errmsg && <p className="alert alert-danger mt-4 text-center font-weight-bold">{errmsg}</p>}
            </div>
        </div>
    </div>
    </div>
    </div>
    );
}