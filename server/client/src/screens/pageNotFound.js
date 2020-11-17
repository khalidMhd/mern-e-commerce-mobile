import React from "react";
import { Link } from "react-router-dom";

const pageNotFoundScreen = () => {

    return (
        <div className='container' style={{maxWidth:'1000px', margin:'50px auto'}}>
            <aside style={{float:"left", display:'block', margin:'auto'}}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" width='460px' height='400px' />
            </aside>
            <main style={{float:"right", backgroundColor:'#393839', height:'400px'}}>
                <h1 style={{color:'#C8DB53'}}>Sorry!</h1>
                <p style={{color:'white'}}>
                    Either you aren't cool enough to visit this page <em style={{color:'#C8DB53'}}>. . . like your social life.</em>
                </p>
                <button style={{color:"#F56A70", backgroundColor:'black', display:'block', margin:'auto'}}><Link to='/'>You can go now!</Link></button>
            </main>
        </div>
    )
};

export default pageNotFoundScreen;