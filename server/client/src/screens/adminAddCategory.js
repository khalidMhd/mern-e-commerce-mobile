import React, { useEffect, useState } from 'react'
import AdminNavScreen from './AdminNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCategory } from '../actions/category'
import { ToastContainer, toast } from 'react-toastify';
import CKEditor from 'ckeditor4-react';

const addCategoryScreen = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const adminSignin = useSelector(state => state.adminSignin)
    const { adminInfo } = adminSignin

    const categoryAdd = useSelector(state => state.categoryAdd)
    const {loading, category, success, error} = categoryAdd;

    useEffect(() => {
        { adminInfo === null ? props.history.push('/adminSignin') : props.history.push('/add-category') }

        if(success){
            toast("Category Created Successfully!");
            // props.history.push('/list-category')
        }
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
        dispatch(addCategory(name, url, details))
    }

    return (
        <>
            <AdminNavScreen />
            <form onSubmit={submitHandler} className='card' style={{maxWidth:'500px', margin:'20px auto'}}>
                <div>
                    <h4 style={{float:"left"}}>Add Category</h4>
                    <Link style={{float:"right"}} to='/list-category' type="button" className="btn btn-primary">View Category</Link>
                </div>

                {loading && <div>Loading...</div>}
                {error && <div>Something went wrong</div>}

                <div style={{margin:'10px'}}>
                    <div className="form-group">
                        <label for="categoryName">Category Name </label>
                        <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" id="categoryName" aria-describedby="category" placeholder="Enter Category Name" required />
                    </div>
                    <div className="form-group">
                        
                        {
                            url != '' && <p>Uploaded</p>
                        }

                        {image == ''? 
                            <div>
                                <label for="categoryImage">Category Image </label>
                                <input type="file" accept="image/*" className="form-control" id="image" onChange={(e)=>setImage(e.target.files[0])} required />
                            </div>
                        :
                            <a className="btn btn-info" onClick={()=>uploadPic()} > Upload Image</a> 
                        }                    
                    </div>
                    <div className="form-group">
                        <label for="cateforyDetails">Category Details</label>
                        {/* <CKEditor data={ */}
                        <textarea type="text" onChange={(e)=>setDetails(e.target.value)} className="form-control" id="categoryDetails" placeholder="Enter Category Details" required />     
                        {/* }/> */}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Submit <ToastContainer /></button>
                
            </form>
        </>
    )
}

export default addCategoryScreen