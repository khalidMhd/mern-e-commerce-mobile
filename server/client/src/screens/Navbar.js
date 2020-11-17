import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { listCategory } from '../actions/category';


const Navbar = (props) => {
  const [search, setSearch] = useState('')
  const [productDetails, setProductDetails] = useState([])
  
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin

  const categoryList = useSelector(state => state.categoryList)
  const { categories, loading, error } = categoryList

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    if (true) {
      dispatch(logout());
      dispatch(listCategory())
      history.push('/signin')
    }
  }

  const fetchProduct = (query) => {
    setSearch(query)
    fetch('/search-product', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    }).then(res => res.json())
      .then(results => {
        setProductDetails(results.product)
        console.log(results);
      })
  }



  return (
    <div>
      <div id='header' className='hideInfo' style={{ textAlign: "center", padding: '10px' }}>

        <Link style={{ float: "left" }} to="/">
          <img style={{ position: "absolute", height: '60px' }} src="https://res.cloudinary.com/insta-demo/image/upload/v1603041659/1j_ojVVCOMkX9Wyrexe4hGfck4v.._1_migbq4.png" />
        </Link>

        <p style={{ textAlign: "center", }} className="fa fa-phone hideInfo">Order By phone/whatsapp: +92 3088887580 </p>

        <a href="https://www.google.com/maps/@33.894468,73.3791128,16.63z" style={{ float: "right", marginLeft: "10px" }} target='_blank'>
          <i className="fa fa-map-marker hideInfo">Find A Store</i>
        </a>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light  container" style={{ backgroundColor: '#4A4643', }}>
        <Link className="navbar-brand navName" to="/">
          <img src="https://res.cloudinary.com/insta-demo/image/upload/v1603041659/1j_ojVVCOMkX9Wyrexe4hGfck4v.._1_migbq4.png" />

        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent"   >
          <ul className="navbar-nav mr-auto" style={{ color: 'white' }}>
            <li className="nav-item active">
              <Link style={{ color: 'white' }} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item dropdown">
              <a style={{ color: 'white' }} className="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Products
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                  categories.map(data =>
                    <a className="dropdown-item" href={'/category/product/' + data.name}>{data.name}</a>
                  )
                }
              </div>
            </li>
            <li className="nav-item active">
              <Link style={{ color: 'white' }} className="nav-link" to="/about">About <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link style={{ color: 'white' }} className="nav-link" to="/">Contact Us <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <span style={{ marginTop: '13px', cursor: 'pointer' }} className="fa fa-search" data-toggle="modal" data-target="#exampleModal"></span>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
          <Link className="nav-link" to="/cart">
                    <i style={{ color: 'white' }} className="fa fa-shopping-cart" aria-hidden="true" style={{ fontSize: 'x-large', color: 'white' }}> </i>
                    <span className="badge text-white"> {cartItems.length} </span>
                  </Link>
            {
              userInfo ?
                <>

                  <li className="nav-item dropdown" >
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {userInfo.length !== null ? <i className="fa fa-user" style={{ fontSize: 'large', color: 'white' }}>{userInfo.user.name} </i> : 'Profile'}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link style={{ marginLeft: '35px' }} className="btn btn-info fa fa-user" to="/profile"> Profile</Link>
                      <div className='dropdown-divider'></div>
                      <button style={{ marginLeft: '35px' }} className="btn btn-danger fa fa-power-off " onClick={() => handleLogout()}> Logout</button>
                    </div>
                  </li>
                </>
                :
                <li>
                  <Link style={{ float: "right", color: 'white' }} className="nav-link" to="/signin"> <i class="fa fa-sign-in" aria-hidden="true"></i> Signin </Link>
                </li>
            }
          </ul>

        </div>
      </nav>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search Products</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input className="form-control mr-sm-2" type="search" placeholder="Enter Product Name" aria-label="Search" value={search} onChange={(e) => fetchProduct(e.target.value)} />
              <br />
              <ul className="list-group">
                {
                  productDetails.map(item => {
                    return (
                      <a href={"/product/details/" + item._id}>
                        <li className="list-group-item">{item.name}</li>
                      </a>

                    )

                  })
                }

              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar