import React, { useEffect, useState } from 'react'
import { saveShipping } from '../actions/cart';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Navbar from './Navbar'
import Footer from './footer'

const shippingScreen= (props) =>{
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [country, setCountry] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        
        return () => {
            // cleanup
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalcode, country }));
        props.history.push('placeorder');
      }

    return <>
      <Navbar />
      <div style={{maxWidth:'650px',margin:'40px auto'}}>
        <CheckoutSteps step1 step2></CheckoutSteps>
      </div>

    <form onSubmit={submitHandler} className='card text-white bg-dark mb-3' style={{maxWidth:'500px',margin:'20px auto'}}>
      <div className='card-body'>

      
    <div class="form-group">
      <label for="address">Address:</label>
      <input type="text" class="form-control" id="address" onChange={(e)=>setAddress(e.target.value)} required />
    </div>
    <div class="form-group">
      <label for="city">City:</label>
      <input type="text" class="form-control" id="city" onChange={(e)=>setCity(e.target.value)} required />
    </div>
    <div class="form-group">
      <label for="postalcode">Postal Code:</label>
      <input type="text" class="form- control" id="postalcode" onChange={(e)=>setPostalcode(e.target.value)} required />
    </div>
    <div class="form-group">
      <label for="country">Country:</label>
      <input type="text" class="form-control" id="country" onChange={(e)=>setCountry(e.target.value)} required />
    </div>

    <button type="submit" class="btn btn-info btn-block">Submit</button>
    </div>
  </form>
 
  <Footer />
  </>
}

export default shippingScreen