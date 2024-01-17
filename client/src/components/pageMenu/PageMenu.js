import React from 'react'
import { NavLink } from 'react-router-dom'

function PageMenu() {
    return (
        <div>
            <nav style={{ display:"flex",height: "40px", borderRadius: "10px", width: "600px", color: "white", marginLeft: "820px", marginBottom: "-40px" }}>
  <ul style={{ color: "black", display: "flex", gap: "10px", textAlign: "right", fontSize: "12px",borderBottom: "2px solid teal",textDecoration:"none"  }}>
    <li>
      <NavLink to="/profile" >
        Profile
      </NavLink>
    </li>
    <li>
      <NavLink to="/ChangePassword"  >
        Change Password
      </NavLink>
    </li>
    <li>
      <NavLink to="/Bookings"  >
        Bookings
      </NavLink>
    </li>
  </ul>
</nav>



        </div>
    )
}

export default PageMenu