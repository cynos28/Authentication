import React from 'react'
import "./header.css";
import { FaHotel } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";


function header() {
  return (
    <header className='header'>
        <nav>
            <div className="logo">
            <FaHotel size={35} color='#17D7A0'/> <span>PrimeLodge</span>
            </div>

            <div className="home-links">
                <li className='user'>
                    <FaUserCircle size={20}/>
                    <p className="--color-black">
                        Hi Shehan |
                    </p>


                </li>


            </div>

        </nav>

    </header>
  )
}

export default header