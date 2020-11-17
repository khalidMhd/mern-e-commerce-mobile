import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct, listProduct } from '../actions/product'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './footer'

function productDetailScreen(props) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    console.log(product);

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
    }

    return <>
        <Navbar />
        <div className="container">
           
            {loading ? <h3>loading...</h3> :
                error ? <div> {error} </div> :
                    (
                        < div style={{ marginTop: '20px' }}>
                            <h5>{product.name}</h5>
                            <p>{product.details}</p>
                            <div className="card" style={{ width: "300px", float: "left" }}>
                                <img  className='card-image' src={product.image} alt="Card image cap" style={{height:'400px',}} />
                                <div className="card-body">
                                    <h5 className="card-img-top">{product.name}</h5>
                                    <h6 className="card-title">$ {product.price}</h6>
                                </div>
                            </div>
                            <div className="card" style={{ width: "40%", float: "right", backgroundColor: '#4A4643', color:'white' }}>
                                <div className="card-body">
                                    <h5 className="card-title">$:  {product.price}</h5>
                                    <h6 className="card-subtitle mb-2 text-white">Status: {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</h6>
                                    <b>Qty: </b>
                                    <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                    <div style={{ marginTop: "20px" }}>
                                        {product.countInStock > 0 &&
                                            <button className='btn btn-info' onClick={handleAddToCart}>Add to Cart</button>}
                                    </div>
                                </div>
                            </div>
                            <br style={{ clear: 'right' }} />
                        </div>
                    )
            }

        </div>
        <div>
            <br style={{ clear: 'left' }} />
            <Footer />
        </div>
    </>
}

export default productDetailScreen