import React from "react";
import './style/follow.css'

const followScreen = () => {

    return (
        <>
             <div className="followHovereffect">
                <img className="img-responsive" src="https://res.cloudinary.com/insta-demo/image/upload/v1602787426/follow3_gentsk.jpg" alt="" style={{height:'300px'}} />
                    <div className="overlay">
                        <h2>Follow Us</h2>
                        <p>
                            <a target='_blank' href="https://web.facebook.com/khalid.khalidokz">
                                <i style={{fontSize: "40px",color:'blue'}} className="fa fa-facebook" ></i>
                            </a>
                            <a target='_blank' href="https://www.instagram.com/thats_me_khalid.mehmood/">
                                <i style={{fontSize: "40px", color:"blue"}} className="fa fa-instagram"></i>
                            </a>
                        </p>
                    </div>
            </div>
        </>
    )
}

export default followScreen