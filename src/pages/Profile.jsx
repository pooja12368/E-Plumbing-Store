import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ProfileForm } from "../components/ProfileForm"
import { apiRequest } from "../libs/request"

function Profile(){
    const id=sessionStorage.getItem("id")
    const role=sessionStorage.getItem('role')
    const [admin,setadmin]=useState({
        "userid":sessionStorage.getItem('userid'),
        "uname":sessionStorage.getItem('uname'),
        "pwd":''
    })

    const [user,setUser]=useState({})

    const handleInput=(e)=>{
        setadmin({...admin,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault() 
        apiRequest.post("admin",user)
        .then(resp=>{
            console.log(resp)
            toast.success("Profile updated successfully")   
            sessionStorage.setItem("uname",user.uname)         
        })
        .catch(error=>console.log("Error",error))   
    }

    useEffect(()=>{
        if(role==='Customer'){
            apiRequest.get("customers/"+id)
            .then(resp=>{                
                setUser(resp.data.data)
            })
        }
    },[])
    return (
        
        <div className="container">
            <div className="card shadow m-3 p-2 bg-transparent text-white text-center">
                {role==='Customer'?(
                    <>
                <h4 className="p-2" style={{borderBottom:"2px solid green",width:"300px",margin:"auto"}}>Customer Profile</h4>
                <br/>
                <ProfileForm data={user} key={user.id}/>
                </>
                ):(
                    <>
                    <h4 className="p-2 text-white text-center">Welcome {user.uname}</h4>
            <div className="row">
                <div className="col-sm-5 mx-auto">
                    <div className="card shadow bg-transparent">
                        <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">User ID</label>
                                <div className="col-sm-8">
                                    <input type="text" name="userid" readOnly value={admin.userid} onChange={handleInput} className="form-control" />                            
                                </div>                        
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">User Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="uname" value={admin.uname} onChange={handleInput} className="form-control" />                            
                                </div>                        
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="pwd" value={admin.pwd} onChange={handleInput} className="form-control" />                            
                                </div>                        
                            </div>
                            <button className="btn btn-primary float-right">Update Profile</button>
                        </form>
                        </div>
                    </div>
                
                </div>
            </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile;
