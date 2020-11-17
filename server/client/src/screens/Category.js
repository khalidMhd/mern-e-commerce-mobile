import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategory } from '../actions/category'

function categoryScreen() {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { categories, loading, error } = categoryList

    useEffect(() => {
        dispatch(listCategory())
    }, [])

    return (<div style={{ marginTop: '30px' }}>
        <h5 style={{ textAlign: "center", color: 'black' }}>OUR BRANDS</h5>
        <hr style={{ width: '120px', border: '2px solid black' }} />
        {loading ? <h2 className='container'>loading...</h2> :
            error ? <div> {error} </div> :
                (
                    <div>
                        {categories.length == 0 ? <p style={{ textAlign: 'center' }}>Categories Not Found</p> :
                            <div className="container">

                                <div class="row">
                                    {
                                        categories.map(item => {
                                            return (
                                                <div class="col-md-2 card" style={{ margin: '10px' }} >
                                                    <Link to={'/category/product/' + item.name} style={{ textDecoration: 'none' }}>
                                                        <img className="card-img-top categoryImage" src={item.image} alt="Lights" style={{ height: '100px', }} />
                                                        <h6 className="card-title"> {item.name}</h6>
                                                    </Link>
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

    )
}

export default categoryScreen