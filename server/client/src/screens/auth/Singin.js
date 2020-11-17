import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../actions/auth'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../footer'

const signinScreen = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }

  return <>
    <Navbar />
    <div>
    <form onSubmit={submitHandler} className='card text-white bg-dark mb-3' style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h4 className="card-header" style={{ textAlign: 'center' }}>Login</h4>
      <div className="card-body">
        <div className="form-group">
          {loading && <div>Loading...</div>}
          {error && <div>Invaled Email or Password</div>}
          <label className="card-title" for="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="card-title" for="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={(e) => setPassword(e.target.value)} />
          <Link to='/reset' style={{ float: "right" }}> Forgot Password</Link>
        </div>
        <button type="submit" style={{ width: '100%' }} className="btn btn-info">Submit</button>
        <p>Create an account <Link to={redirect === "/" ? "signup" : "signup?redirect=" + redirect} style={{color:'#17A2B8'}}> Sign-up here</Link> </p>
      </div>

    </form>
    </div>
    <Footer />
  </>
}

export default signinScreen


