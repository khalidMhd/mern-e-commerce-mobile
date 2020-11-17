import React, { useEffect, useState } from 'react'
import AdminNavScreen from './AdminNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategory, deleteCategory, updateCategory } from '../actions/category'
import { ToastContainer, toast } from 'react-toastify';

const listCategoryScreen = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [id, setId] = useState('');

    const adminSignin = useSelector(state => state.adminSignin)
    const { adminInfo } = adminSignin

    const categoryList = useSelector(state => state.categoryList)
    const { loading, categories, error } = categoryList

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { success } = categoryDelete

    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {success:saveSuccess} = categoryUpdate

    useEffect(() => {
        { adminInfo === null ? props.history.push('/adminSignin') : props.history.push('/list-category') }
        if (success) {
            toast("Category Deleted Successfully!");
        }

        if (saveSuccess) {
            toast("Category Update Successfully!");
        }

        dispatch(listCategory());

    }, [adminInfo, saveSuccess, success])

    const deleteHandler = (id) => {
        dispatch(deleteCategory(id))
        // toast("Category Deleted Successfully!");
    }

    const updateHandler = (item)=>{
        setName(item.name)
        setDetails(item.details)
        setId(item._id)
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateCategory(id, name, details))
    }

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    return (
        <>
            <AdminNavScreen />
            <div className='container'>
                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ float: "left" }}>List Category</h4>
                    <Link style={{ float: "right" }} to='/add-category' type="button" className="btn btn-primary">Add Category</Link>
                </div>
                <input type="text" className="form-control mr-sm-2" id="myInput" onKeyUp={myFunction} placeholder="Search for names.." title="Type in a name"/>

                <table className="table" id="myTable">
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Details</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {categories.length === 0 ? <h4>Category Not Found!</h4> :

                        <tbody>
                            {
                                categories.map(data =>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{data.name}</td>
                                        <td>{data.details}</td>
                                        <td><img src={data.image} style={{ height: '100px' }} alt={data.name} /></td>
                                        <td>
                                            <i className="fa fa-trash " onClick={() => { if (window.confirm('Are you sure to delete this item?')) deleteHandler(data._id) }} style={{ color: 'red', fontSize: "x-large", cursor: "pointer" }} aria-hidden="true"></i>
                                            <i className="fa fa-edit " onClick={()=>updateHandler(data)} data-toggle="modal" data-target={"#edit" + data._id} style={{ color: 'blue', fontSize: "x-large", cursor: "pointer" }} aria-hidden="true"></i>
                                            <ToastContainer />
                                        </td>

                                        {/* Modal  */}
                                        <div className="modal fade" id={"edit" + data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={submitHandler} className='card' style={{ width: '400px', margin: '20px auto' }}>

                                                            {/* {loading && <div>Loading...</div>}
                                                             {error && <div>Something went wrong</div>} */}

                                                            <div style={{ margin: '10px' }}>
                                                                <div className="form-group">
                                                                    <label for="categoryName">Category Name: <b>{data.name}</b> </label>
                                                                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="categoryName" aria-describedby="category" placeholder="Enter Category Name" />
                                                                </div>
                                                                {/* <div className="form-group">
                                                                    <label for="categoryImage">Category Image </label>
                                                                    <input type="file" className="form-control" id="categoryImage" />
                                                                </div> */}
                                                                <div className="form-group">
                                                                    <label for="cateforyDetails">Category Details: <b>{data.details}</b></label>
                                                                    <textarea type="text" onChange={(e) => setDetails(e.target.value)} className="form-control" id="categoryDetails" placeholder="Enter Category Details" />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary">Submit <ToastContainer /></button>

                                                        </form>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                )
                            }
                        </tbody>
                    }
                </table>
            </div>

        </>
    )
}

export default listCategoryScreen