import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProduct, ListProductByCategory } from '../actions/product'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './footer'
import { ListCategoryByName } from '../actions/category'

function productByCategoryScreen(props) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)


    const ProductByCategoryList = useSelector(state => state.ProductByCategoryList)
    const { products, loading, error } = ProductByCategoryList

    const categoryByNameList = useSelector(state => state.categoryByNameList)
    const { category, loading: saveLoading, error: saveError } = categoryByNameList
    console.log(category);

    useEffect(() => {
        dispatch(ListProductByCategory(props.match.params.catName))
        dispatch(ListCategoryByName(props.match.params.catName))
    }, [])

    const handleAddToCart = (id) => {
        props.history.push('/cart/' + id + '?qty=' + qty)
    }

    return (<div>
        <Navbar />
        <div className='container' style={{ marginTop: '20px' }}>
            {saveLoading ? <h3>loading..</h3> :
                saveError ? <div>{saveError} </div>
                    : (
                        <div>
                            {category.length == 0 ? <p style={{ textAlign: 'center' }}>Product Not Found</p> :
                                <div>
                                    {
                                        category.map(data =>
                                            <div>
                                                <h4>{data.name} Brands</h4>
                                                <p>{data.details}</p>
                                            </div>
                                        )
                                    }
                                </div>

                            }
                        </div>
                    )
            }

            {loading ? <div>loading...</div> :
                error ? <div> {error} </div> :
                    (
                        <div>

                            {products.length == 0 ? <h4 style={{ textAlign: 'center' }}>Product Not Found</h4> :
                                <div className="container">

                                    <div className="row">
                                        {
                                            products.map(item => {
                                                return (
                                                    <div className="col-md-3 card" style={{ marginTop: '10px' }}>
                                                        <img src={item.image} alt="Lights" style={{ width: '100%', height: '330px' }} />
                                                        <div className="card-body">
                                                            <Link to={"/product/details/" + item._id}>{item.name}</Link> <br />
                                                            <h6 style={{ float: 'left' }}>$ {item.price}</h6>
                                                            <Link style={{ float: 'right', fontSize: '15x' }} onClick={() => handleAddToCart(item._id)} className="fa fa-shopping-cart" to="#">Add</Link>
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
        <Footer />
    </div>

    )
}

export default productByCategoryScreen