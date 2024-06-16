import React from "react"
import "../styles/Homepage.css"
import {Link} from "react-router-dom";
const Homepage = () => {
  return (
    <>
      <video autoPlay muted loop id="myVideo" >
        <source src="/assets/videos/bg.mp4" type="video/mp4"/>
      </video>
      <div className="content">
        <div className="card w-25">
           <img src="" alt="logo"/>
         {/*can give -ve margin to cardbody style={{marginTop:"-60px"} and hr tag above it*/}  
        <div className="card-body">
          <h5 className="card-title">Indias Best Carrer Platform</h5>
           <p className="card-text">
             Search and manage your jobs with ease.
           </p>
           <div className="d-flex justify-content-between mt-5">
            <p>Not a user Register <Link to={"/register"}>Here !</Link>  </p>
            <p>
            <Link to={"/login"} className="myBtn">
            Login
            </Link>  
            </p>
           </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Homepage