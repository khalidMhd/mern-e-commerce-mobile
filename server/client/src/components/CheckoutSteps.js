import React from 'react';
function CheckoutSteps(props) {
  return <div className="checkout-steps">
    <div className={props.step1 ? 'active' : ''} >Signin</div>
    <div className={props.step2 ? 'active' : ''} >Shipping</div>
    <div className={props.step3 ? 'active' : ''} >Place Order</div>
  </div>
}

export default CheckoutSteps;