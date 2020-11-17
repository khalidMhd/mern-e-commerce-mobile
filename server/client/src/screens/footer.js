import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategory } from '../actions/category'

const Footer = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector(state => state.categoryList)
  const { categories, loading, error } = categoryList
  useDispatch(listCategory())

  useEffect(() => {
    dispatch(listCategory())
  }, [])

  return (<>
    <hr style={{ border: '2px solid green' }} />

    <footer style={{ backgroundColor: '#4A4643', color:'white' }}>
      {/* <br style={{ clear: 'left' }} /> */}


      <div className="container text-center text-md-left">

        <div className="row">

          <div className="col-md-4 mx-auto">

            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Description</h5>
            <p>Buy phones online in pakistan from the most trusted site Phone <b>E-Mobile</b>.
                  Buy 100% original, PTA approved, box-packed, with warranty mobiles in Pakistan</p>

          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-2 mx-auto">
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Products</h5>
            <ul className="list-unstyled">
              {
                categories.slice(0, 4).map(item =>
                  <li>
                    <a style={{color:'white'}} href={'/category/product/' + item.name}>{item.name}</a>
                  </li>
                )
              }
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none" />
          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-3 mx-auto">

            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Contact</h5>

            <ul className="list-unstyled">
              <li>
                <i class="fa fa-home"> Hangu, KPK, Pakistan</i>
              </li>
              <li>
                <i class="fa fa-phone"> 03088887580</i>
              </li>
              <li>
                <a target="_blank" href="mailto:khalidmhd1137@gmail.com">
                  <i class="fa fa-envelope"> khalidmhd1137@gmail.com </i>
                </a>
              </li>
              <li>
                <a target='_blank' href="https://www.google.com/maps/place/Ar+Rehman+CNG/@33.5484239,71.1025564,17z/data=!3m1!4b1!4m5!3m4!1s0x38d859f0e758aac3:0xc2e7535098442abc!8m2!3d33.5484194!4d71.1047451">
                  <i className="fa fa-map-marker" > Find A Store</i>
                </a>
              </li>
            </ul>

          </div>

        </div>

      </div>

      <hr />

      <ul className="list-unstyled list-inline text-center py-2">
        <li className="list-inline-item">
          <h5 className="mb-1">Register for free</h5>
        </li>
        <li className="list-inline-item">
          <Link to="/signup" className="btn btn-info btn-rounded">Sign up!</Link>
        </li>
      </ul>

      <hr />

      <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <Link to="/"> E-Mobile.com</Link>
      </div>
    </footer>
  </>
  )
}

export default Footer