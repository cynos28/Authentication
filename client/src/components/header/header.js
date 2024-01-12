import React from 'react';
import "./header.css";
import { FaHotel } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const activeLink = ({ isActive }) => (isActive ? "active" : "");

function Header() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <header className='header'>
            <nav>
                <div className="logo" onClick={goHome}>
                    <FaHotel size={35} color='#17D7A0'/> <span>PrimeLodge</span>
                </div>

                <ul className="home-links">
                    <li>
                        <Link to="/login" >
                            <button className="button-login">
                                <svg className="svg-icon" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <g stroke="#206a5d" stroke-linecap="round" stroke-width="1.5">
                                        <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
                                        <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
                                    </g>
                                </svg>
                                <span className="label"> Login </span>
                            </button>
                        </Link>
                    </li>

                    <li className='user'>
                        <FaCircleUser size={30} />
                        <p className="user-name">
                            Hi Shehan
                        </p>
                    </li>

                    <li className='profile-button'>
                        <NavLink to="/profile" activeClassName={activeLink}>Profile</NavLink>
                    </li>

                    <li>
                        <button className='button-logout'>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
