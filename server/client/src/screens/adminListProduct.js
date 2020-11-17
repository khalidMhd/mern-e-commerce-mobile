import React, { useEffect, useState } from 'react'
import AdminNavScreen from './AdminNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { deleteProduct, listProduct, updateProduct } from '../actions/product';
import { listCategory } from '../actions/category';

const listProductScreen = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [details, setDetails] = useState('')
    const [id, setId] = useState('');

    const adminSignin = useSelector(state => state.adminSignin)
    const { adminInfo } = adminSignin

    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { success } = productDelete

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    const productUpdate = useSelector(state => state.productUpdate)
    const { success: saveSuccess } = productUpdate

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        { adminInfo === null ? props.history.push('/adminSignin') : props.history.push('/list-product') }

        if (success) {
            toast("Product Deleted Successfully!");
        }

        if (saveSuccess) {
            toast("Product Updated Successfully!");
        }
        dispatch(listCategory());
        dispatch(listProduct());

    }, [adminInfo, success, saveSuccess])

    const updateHandler = (item) => {
        setName(item.name)
        setCategoryName(item.categoryName)
        setPrice(item.price)
        setCountInStock(item.countInStock)
        setDetails(item.details)
        setId(item._id)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct(id, name,categoryName, price,countInStock, details))
        window.location.reload(false);
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
                    <h4 style={{ float: "left" }}>List Product</h4>
                    <Link style={{ float: "right" }} to='/add-product' type="button" className="btn btn-primary">Add Product</Link>
                </div>
                <input type="text" className="form-control mr-sm-2" id="myInput" onKeyUp={myFunction} placeholder="Search for names.." title="Type in a name"/>

                <table className="table" id="myTable">
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">PKR</th>
                            <th scope="col">Category</th>
                            <th scope="col">Details</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {products.length === 0 ? <h4>Products Not Found!</h4> :

                        <tbody>
                            {
                                products.map(data =>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{data.name}</td>
                                        <td>{data.price}</td>
                                        <td>{data.categoryName}</td>
                                        <td>{data.details}</td>
                                        <td><img src={data.image} style={{ height: '100px' }} alt={data.name} /></td>
                                        <td>
                                            <i className="fa fa-trash " style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to delete this item?')) deleteHandler(data._id) }} aria-hidden="true"></i>
                                            <i className="fa fa-edit " onClick={() => updateHandler(data)} data-toggle="modal" data-target={"#edit" + data._id} style={{ color: 'blue', fontSize: "x-large", cursor: "pointer" }} aria-hidden="true"></i>
                                            <ToastContainer />
                                        </td>

                                        {/* Modal  */}
                                        <div className="modal fade" id={"edit" + data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
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
                                                                    <label for="productName">Product Name: <b>{data.name}</b> </label>
                                                                    <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="productName" aria-describedby="product" placeholder="Enter product Name" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label> Category Name <b>{data.categoryName}</b> </label>
                                                                    <select onChange={(e) => setCategoryName(e.target.value)} className="form-control" >
                                                                        <option></option>
                                                                        {
                                                                            categories.map(data =>
                                                                                <option>{data.name}</option>
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="productPrice">Product Price: <b>{data.price}</b> </label>
                                                                    <input type="number" onChange={(e) => setPrice(e.target.value)} className="form-control" id="productPrice" aria-describedby="product" placeholder="Enter Product Price" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="countInStock">Product Stock: <b>{data.countInStock}</b> </label>
                                                                    <input type="number" onChange={(e) => setCountInStock(e.target.value)} className="form-control" id="countInStock" aria-describedby="product" placeholder="Enter Product Stock" />
                                                                </div>
                                                                {/* <div className="form-group">
                                                                    <label for="productImage">product Image </label>
                                                                    <input type="file" className="form-control" id="productImage" />
                                                                </div> */}
                                                                <div className="form-group">
                                                                    <label for="cateforyDetails">product Details: <b>{data.details}</b></label>
                                                                    <textarea type="text" onChange={(e) => setDetails(e.target.value)} className="form-control" id="productDetails" placeholder="Enter product Details" />
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

export default listProductScreen