import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiRequest,SERVER_URL } from '../libs/request'
import productvalidation from '../validations/productvalidation'

function EditProduct() {
  console.log('Edit product page')
  const { prodid } = useParams()
  const [cats,setcats]=useState([])
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: '',
    category: '',
    price: '',
    brand: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(productvalidation(product))
    setSubmitted(true)
  }

  useEffect(() => {
    console.log(errors)

    apiRequest.get('products/' + prodid).then((resp) => {
      console.log(resp.data)
      setProduct(resp.data)
      //setProduct({...product,category:resp.data.category.id})
    })

    apiRequest.get('categories') 
        .then(resp=>setcats(resp.data))
        .catch(error=>toast.error(error))

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product)
      apiRequest
        .put('products/' + prodid, product)
        .then((resp) => {
          let result = resp.data
          console.log(result)
          toast.success('Product updated successfully')
          navigate('/products')
        })
        .catch((error) => {
          toast.error('Error saving product')
        })
    }
  }, [errors])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-3'>
          <img
            width='250'
            alt="ProductImage"
            style={{ marginTop: '20px' }}
            src={SERVER_URL+ product?.photo}
          />
        </div>
        <div className='col-sm-6'>
          <h4 className='text-center p-2'>Edit Product Form</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>
                Product Name
              </label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  name='pname'
                  value={product?.pname}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.pname && (
                  <small className='text-danger float-right'>
                    {errors.pname}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Category</label>
              <div className='col-sm-8'>
                <select
                  name='category'
                  value={product.category.id}
                  onChange={handleInput}
                  className='form-control'
                >
                  <option value=''>Select Category</option>
                  {cats.filter(x=>x.isactive).map(x=>(
                      <option value={x.id}>{x.catname}</option>
                  ))}                  
                </select>
                {errors.pcat && (
                  <small className='text-danger float-right'>
                    {errors.pcat}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Price</label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  name='price'
                  value={product.price}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.price && (
                  <small className='text-danger float-right'>
                    {errors.price}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Price</label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  name='descr'
                  value={product.descr}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.descr && (
                  <small className='text-danger float-right'>
                    {errors.descr}
                  </small>
                )}
              </div>
            </div>

            <button className='btn btn-primary float-right'>
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
