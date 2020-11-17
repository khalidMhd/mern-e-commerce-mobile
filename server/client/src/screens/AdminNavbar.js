import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import Cookie from 'js-cookie';

const AdminNavScreen
 = (props) => {
  const adminSignin = useSelector(state => state.adminSignin)
  const { adminInfo } = adminSignin

  const history = useHistory()
  useEffect(() => {
    { adminInfo === null ? history.push('/adminSignin') : history.push('/admin') }

    return () => {

    }
  }, [adminInfo])

  const logoutHandler = () => {
    Cookie.remove('adminInfo')
    // history.push('/adminSignin')
  }

  return <>
  <div>
    <h3 style={{textAlign:'center'}}>Admin Panal</h3>
  </div>
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/admin">E-MOBILE</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className ="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/admin">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add-product">Add Product</Link> 
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add-category">Add Category</Link> 
      </li>
    </ul>

      <button className="btn btn-outline-success my-2 my-sm-0"  onClick={()=>logoutHandler({...window.location.href="/adminSignin"})} type="submit">Log-Out</button>
  </div>
</nav>
  </>
}

export default AdminNavScreen
