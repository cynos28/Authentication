import React from 'react'
import "./header.css";
import { FaHotel } from "react-icons/fa6";

function header() {
  return (
    <header>
        <nav>
            <div className="logo">
            <FaHotel size={35} color='white'/> <span>PrimeLodge</span>
            </div>

            <div className="home-links">

                
            </div>

        </nav>

    </header>
  )
}

export default header