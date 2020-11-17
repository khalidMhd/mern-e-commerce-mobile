import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, addToCart } from '../actions/cart';
import Footer from './footer';
import Navbar from './Navbar';
function CartScreen(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);


  return <>
    <Navbar />
    <div className='container'>
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
              </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <h5>
                  Cart is empty
                </h5>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/details/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty:
                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.countInStock).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </select>
                        <button style={{ marginLeft: '45%' }} type="button" className="btn btn-info" onClick={() => removeFromCartHandler(item.product)} >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>

        </div>
        <div className="cart-action text-white">
          <h5>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qty + ' ,', '')} items)

        <br /> $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h5>
          <button className="btn btn-info" style={{ marginTop: '20px' }} onClick={checkoutHandler} className="button primary full-width btn btn-info" disabled={cartItems.length === 0}>
            Proceed to Checkout
      </button>

        </div>

      </div>
    </div>
    <div>
      <Footer />
    </div>
  </>
}

export default CartScreen;