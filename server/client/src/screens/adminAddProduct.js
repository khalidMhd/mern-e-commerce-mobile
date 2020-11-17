import React, { useEffect, useState } from 'react'
import AdminNavScreen from './AdminNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../actions/product'
import { ToastContainer, toast } from 'react-toastify';
import { listCategory } from '../actions/category'
import CKEditor from 'ckeditor4-react';

const addProductScreen= (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [details, setDetails] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')

    const adminSignin = useSelector(state => state.adminSignin)
    const { adminInfo } = adminSignin

    const productAdd = useSelector(state => state.productAdd)
    const {loading, product, success, error} = productAdd;

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    useEffect(() => {
        { adminInfo === null ? props.history.push('/adminSignin') : props.history.push('/add-product') }

        if(success){
            toast("Product Created Successfully!");
        }
        dispatch(listCategory());

    }, [adminInfo,success])

    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-demo")
        data.append("cloud_name", "insta-demo")
        fetch("https://api.cloudinary.com/v1_1/insta-demo/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast(data.error);
                } else {
                    setUrl(data.url)
                }
            })
            .catch(err => {
                console.log(err)
            })
      }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(addProduct(name,categoryName,price,countInStock, url, details))
    }

    return (
        <>
            <AdminNavScreen />
            {/* <CKEditor data="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" /> */}

            <form onSubmit={submitHandler} className='card' style={{maxWidth:'500px', margin:'20px auto'}}>
                <div>
                    <h4 style={{float:"left"}}>Add Product</h4>
                    <Link style={{float:"right"}} to='/list-product' type="button" className="btn btn-primary">View Product</Link>
                </div>

                {loading && <div>Loading...</div>}
                {error && <div>Something went wrong</div>}

                <div style={{margin:'10px'}}>
                    <div className="form-group">
                        <label for="productName">Product Name </label>
                        <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" id="productName" aria-describedby="product" placeholder="Enter Product Name" required />
                    </div>
                    
                  
                    <div className="form-group">
                        <label> Category Name </label>
                        <select onChange={(e)=>setCategoryName(e.target.value)} className="form-control" > 
                            <option></option>
                            {
                                categories.map(data=>
                                <option>{data.name}</option>
                                )
                            }
                        </select>
                    </div>
                         
                    <div className="form-group">
                        <label for="productPrice">Product Price </label>
                        <input type="number" onChange={(e)=>setPrice(e.target.value)} className="form-control" id="productPeice" aria-describedby="product" placeholder="Enter Product Price" required />
                    </div>

                    <div className="form-group">
                        <label for="productStock">Product Stock </label>
                        <input type="number" onChange={(e)=>setCountInStock(e.target.value)} className="form-control" id="productStock" aria-describedby="product" placeholder="Enter Product Stock" required />
                    </div>

                    <div className="form-group">
                        {url !== '' && <p>Uploaded</p>}
                        {image === ''? 
                            <div>
                                <label for="productImage">Product Image </label>
                                <input type="file" accept="image/*" className="form-control" id="image" onChange={(e)=>setImage(e.target.files[0])} required />
                            </div>
                        :
                            <button className="btn btn-info" type='button' onClick={()=>uploadPic()} > Upload Image</button> 
                        }                    
                    </div>
                    <div className="form-group">
                        <label for="productDetails">Product Details</label>
                        {/* <CKEditor data={ */}
                        <textarea type="text" onChange={(e)=>setDetails(e.target.value)} className="form-control" id="productDetails" placeholder="Enter Product Details" required />     
                    {/* }/> */}
                        </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit <ToastContainer /></button>
                
            </form>
        </>
    )
}

export default addProductScreen
