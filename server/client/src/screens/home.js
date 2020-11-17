import React, { useEffect, useState } from 'react'
import Product from './Products'
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { listCategory } from '../actions/category'
import { Link } from 'react-router-dom'
import { listProduct } from '../actions/product'
import Navbar from './Navbar'
import Footer from './footer'
import './style/product.css'
import FollowScreen from './followUs'
import ActionButton from './actionButton'

function Home(props) {

    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const [showProduct1, setShowProduct1] = useState(true)
    const [showProduct2, setShowProduct2] = useState(false)
    const [showProduct3, setShowProduct3] = useState(false)

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList

    useEffect(() => {
        dispatch(listProduct())
    }, [])

    const handleAddToCart = (id) => {
        props.history.push('/cart/' + id + '?qty=' + qty)
    }

    function show1(data) {
        setShowProduct2(false)
        setShowProduct3(false)
        setShowProduct1(data)
        document.location.reload(false)
    }

    function show2(data) {
        setShowProduct1(false)
        setShowProduct2(data)
        setShowProduct3(false)
    }

    function show3(data) {
        setShowProduct1(false)
        setShowProduct2(false)
        setShowProduct3(data)
    }

    return (
        <>
            <div className='backImage' >
                <header>
                    <Navbar />
                </header>
                <div className="container BackTextAnimation">
                    <h1>TRADE <br /> YOUR OLD PHONE <br /> & BUY NEW</h1>
                </div>
            </div>

            {/* Category */}
            <div>
                <Category />
                <br style={{ clear: 'left' }} />
            </div>

            <div>
                <nav class="navbar navbar-expand-lg navbar-light " style={{ maxWidth: '800px', margin: 'auto' }}>
                    <button type="button" className="btn btn-secondary  mr-3" disabled>Sort By:</button>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons" style={{ textAlign: 'center', display: 'block', margin: '20px auto' }}>
                                    <button type="button" onClick={() => show1(true)} className="btn btn-outline-secondary active mr-3">Latest Products</button>
                                    <button type="button" onClick={() => show2(true)} className="btn btn-outline-secondary mr-3">Price -- High to Low</button>
                                    <button type="button" onClick={() => show3(true)} className="btn btn-outline-secondary mr-3">Price -- Low to Hight</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {
                    showProduct1 ?
                        <div>
                            {/* Latest Products */}
                            <div className='container' >
                                <h5 style={{ textAlign: "center", color: 'black' }}>LATEST PRODUCTS</h5>
                                <hr style={{ width: '165px', border: '2px solid black' }} />
                                <Link to='/product/gallery' style={{ float: "right" }}> More Products</Link>

                                <div>
                                    {loading ? <h2>loading...</h2> :
                                        error ? <div> {error} </div> :
                                            (
                                                <div>
                                                    {
                                                        products.length == 0 ? <p style={{ textAlign: 'center' }}>Product Not Found</p> :
                                                            <div className="container">

                                                                <div className="row" style={{ float: "left" }}>
                                                                    {
                                                                        products.slice(0, 8).map(item => {
                                                                            return (
                                                                                <div className="col-md-3 card hovereffect" style={{ marginTop: '10px' }}>
                                                                                    <img className='img-responsive' src={item.image} alt="Lights" />
                                                                                    <div className="caption overlay">
                                                                                        <h2>
                                                                                            <Link style={{ color: 'white' }} to={"/product/details/" + item._id}>{item.name}</Link>
                                                                                        </h2>
                                                                                        <h5 style={{ color: 'yellow', border: '1px solid', }}>$ {item.price}</h5>
                                                                                        <Link className="info fa fa-shopping-cart" to="#" onClick={() => handleAddToCart(item._id)}>Add</Link>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            )}

                                </div>

                                <br style={{ clear: 'left' }} />
                            </div>
                        </div>
                        :
                        showProduct2 ?
                            <div> 
                                {/* High to Low Products */}
                                <div className='container' >
                                    <h5 style={{ textAlign: "center", color: 'black', marginTop: '20px' }}> PRICE: HIGH TO LOW PRODUCTS</h5>
                                    <hr style={{ width: '290px', border: '2px solid black' }} />
                                    <Link to='/product/gallery' style={{ float: "right" }}> More Products</Link>
                                    <div>
                                        {loading ? <h2>loading...</h2> :
                                            error ? <div> {error} </div> :
                                                (
                                                    <div>
                                                        {
                                                            products.length == 0 ? <p style={{ textAlign: 'center' }}>Product Not Found</p> :
                                                                <div className="container">
                                                                    <div className="row" style={{ float: "left" }}>
                                                                        {
                                                                            products.sort(function (a, b) { return b.price - a.price }).slice(0, 8).map(item => {
                                                                                return (
                                                                                    <div className="col-md-3 card hovereffect" style={{ marginTop: '10px' }}>
                                                                                        <img className='img-responsive' src={item.image} alt="Lights" />
                                                                                        <div className="caption overlay">
                                                                                            <h2>
                                                                                                <Link style={{ color: 'white' }} to={"/product/details/" + item._id}>{item.name}</Link>
                                                                                            </h2>
                                                                                            <h5 style={{ color: 'yellow', border: '1px solid', }}>$ {item.price}</h5>
                                                                                            <Link className="info fa fa-shopping-cart" to="#" onClick={() => handleAddToCart(item._id)}>Add</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                )}

                                    </div>

                                    <br style={{ clear: 'left' }} />
                                </div>
                            </div>
                            :
                            showProduct3 ? <div>
                                <div>
                                    {/* Lowt to High Products */}
                                    <div className='container' >
                                        <h5 style={{ textAlign: "center", color: 'black', marginTop: '20px' }}> PRICE: LOW TO HIGH PRODUCTS</h5>
                                        <hr style={{ width: '290px', border: '2px solid black' }} />
                                        <Link to='/product/gallery' style={{ float: "right" }}> More Products</Link>
                                        <div>
                                            {loading ? <h2>loading...</h2> :
                                                error ? <div> {error} </div> :
                                                    (
                                                        <div>
                                                            {
                                                                products.length == 0 ? <p style={{ textAlign: 'center' }}>Product Not Found</p> :
                                                                    <div className="container">
                                                                        <div className="row" style={{ float: "left" }}>
                                                                            {
                                                                                products.sort(function (a, b) { return a.price - b.price }).slice(0, 8).map(item => {
                                                                                    return (
                                                                                        <div className="col-md-3 card hovereffect" style={{ marginTop: '10px' }}>
                                                                                            <img className='img-responsive' src={item.image} alt="Lights" />
                                                                                            <div className="caption overlay">
                                                                                                <h2>
                                                                                                    <Link style={{ color: 'white' }} to={"/product/details/" + item._id}>{item.name}</Link>
                                                                                                </h2>
                                                                                                <h5 style={{ color: 'yellow', border: '1px solid', }}>$ {item.price}</h5>
                                                                                                <Link className="info fa fa-shopping-cart" to="#" onClick={() => handleAddToCart(item._id)}>Add</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    )}
                                        </div>

                                        <br style={{ clear: 'left' }} />
                                    </div>
                                </div>
                            </div> : null
                }
            </div>


            {/* follow */}

            <div className='container' style={{ marginTop: '60px' }}>
                <h5 style={{ textAlign: "center", color: 'black' }}>FOLLOW US</h5>
                <hr style={{ width: '110px', border: '2px solid black' }} />
                <FollowScreen />
                <br style={{ clear: 'left' }} />
            </div>
            <ActionButton />
            <div>
                <Footer />
            </div>
        </>

    )
}

export default Home