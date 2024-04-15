import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../libs/request";

function Categories(){
    const [cats,setcats]=useState([])
    const [catname,setcatname]=useState()
    const updateCategory=cat=>{
        apiRequest.put('categories/'+cat.id,{isactive:!cat.isactive})
        .then(resp=>{
            toast.success(resp.data.data)
            loaddata()
        })
        .catch(err=>alert(err.error))
    }

    const handleSubmit=e=>{
        e.preventDefault()
        if(catname===undefined){
            toast.error('Please provide full information')
            return
        }
       apiRequest.post('categories',{catname:catname})
        .then(resp=>{
            setcatname('')
            toast.success(resp.data.data)
            loaddata()
        })
        .catch(error=>{
            toast.error(error.error)
        })
    }

    const loaddata=()=>{
        apiRequest.get('categories') 
       .then(resp=>setcats(resp.data))
       .catch(error=>alert(error))
    }
    useEffect(()=>{
       loaddata()
    },[])
    return  (
        <div className="container-fluid text-white">
            <h4 className="p-2">Categories</h4>
            <div className="row">
                <div className="col-sm-8">
                    <table className="table table-bordered table-striped table-light table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>                                                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cats.filter(x=>x.isactive).map(x=>(
                            <tr key={x.id}>
                                <td>{x.catname}</td>                                                           
                                <td><button onClick={(e)=>updateCategory(x)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4">
                    <h4>Add/Edit Category</h4>
                    <form>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input type="text" onChange={e=>setcatname(e.target.value)} value={catname} className="form-control" />
                    </div>                   
                    <button onClick={handleSubmit} className="btn btn-primary float-right">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Categories;