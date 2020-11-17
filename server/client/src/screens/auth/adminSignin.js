import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signinAdmin } from '../../actions/auth'

const adminSigninScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const adminSignin = useSelector(state => state.adminSignin);
    const { loading, userInfo, error } = adminSignin;

    useEffect(() => {
        if (userInfo) {
          props.history.push('/admin');
        }
        return () => {
          //
        };
      }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signinAdmin(email, password));
      }

    return <form onSubmit={submitHandler} className='card text-white bg-dark'style={{maxWidth:'500px', margin:'60px auto'}}>
      <h4 className="card-header" style={{textAlign:'center'}}>Admin Login</h4>
      <div className="card-body">
        <div className="form-group">
        {loading && <div>Loading...</div>}
          {error && <div>Invaled Email or Password</div>}
            <label for="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"  onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{width:'100%'}} className="btn btn-primary">Submit</button>
        </div>
    </form>

}

export default adminSigninScreen


