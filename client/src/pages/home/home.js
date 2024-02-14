import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/Footer'
import "../home/home.css"
import HeroImage from "../../assets/hero.jpg"



function home() {
  return (
    <div>
     
      <section className='hero'>
        <div className="hero-text">
          <h1>Your Stay, Our Passion – Where Comfort Meets Luxury!</h1>

          <p>
            Discover a haven of comfort and style at our hotel, where every detail is crafted to elevate your experience.
            Immerse yourself in luxury, unwind in elegance, and let our dedicated team turn moments into memories.
            Your stay is not just a reservation;
            it's a journey of unparalleled hospitality and personalized service.

          </p>
          <p>
            Welcome to a world where every visit is a story, and every guest is a cherished part of our narrative.
            Indulge in the perfect blend of comfort and sophistication, where your satisfaction is our ultimate commitment.
          </p>
          <div className="hero-buttons">
            <button className="button-login">
              
              <span className="label"> Login </span>
            </button>
            <button className="button-register">

              <span className="label"> Register </span>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Hero Image"/>
        </div>

      </section>
    
    </div>

  )
}

export default home