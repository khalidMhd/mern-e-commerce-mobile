import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from './footer'
const aboutScreen = () => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Navbar />

               <div className='container' style={{marginTop:'20px'}}>
                <div className='card'>
                    <img className='card-img-top' src='https://d11zer3aoz69xt.cloudfront.net/media/catalog/category/iSCat-MPNN-870x335_1.jpg' />
                    <div className='card-body'>
                        <h4 className='card-title'>Hey!</h4>
                        <p className='card-txt'>
                            It is so very kind of you to take the time out to get to know us better.
                            E-MOBILE.pk  is your One-stop online shopping place in Pakistan bringing you
                            a hassle-free and the most reliable shopping experience delivering it at
                            your doorstep. Online shopping in Pakistan has seen a fundamental boom
                            over the last few years and E-MOBILE intend to provide an infallible
                            and absolutely trouble-free shopping experience to the people Pakistan.
                            <br /> <br />
                            Our mission here at E-MOBILE.pk is simple: make online shopping easy!
                            We’ve designed the website to ensure you can quickly find the lowest price
                            for your product of interest - whether it is a smartphone and tablet.

                    </p>
                    </div>
                </div>
            </div>
            <div>
                <br clear='both' />
                <Footer />
            </div>
        </>
    )

}

export default aboutScreen