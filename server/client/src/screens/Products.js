import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProduct } from '../actions/product'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './footer'

function productScreen(props) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    useEffect(() => {
        dispatch(listProduct())
    }, [])

    const handleAddToCart = (id) => {
        props.history.push('/cart/' + id + '?qty=' + qty)
    }

    return (<div>
        <Navbar />
        <div className="container" style={{marginTop:'30px'}}>
        <h2>GALLERY</h2>
        {loading ? <h4>loading...</h4> :
            error ? <div> {error} </div> :
                (
                    <div>
                        {products.length == 0 ? <p style={{ textAlign: 'center' }}>Product Not Found</p> :

                                <div className="row" style={{ float: "left" }}>
                                    {
                                        products.map(item => {
                                            return (
                                                <div className="col-md-3 card" style={{ marginTop: '10px' }}>
                                                    <Link to={"/product/details/" + item._id} style={{ textDecoration: 'none' }}>
                                                        <img src={item.image} alt="Lights" style={{ width: '100%', height: '350px' }} />
                                                    </Link>
                                                    <div className="card-body">
                                                        <Link to={"/product/details/" + item._id} style={{ textDecoration: 'none' }}>{item.name}</Link> <br />
                                                        <h6 style={{ float: 'left' }}>$ {item.price}</h6>
                                                        <Link style={{ float: 'right', fontSize: '15x', textDecoration: 'none' }} className="fa fa-shopping-cart cartInfo" onClick={() => handleAddToCart(item._id)} to="#">Add</Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                        }
                    </div>
                )}
            </div>


        <br style={{ clear: 'left' }} />
        <br />

        <br style={{ clear: 'left' }} />
        <Footer />
    </div>

    )
}

export default productScreen