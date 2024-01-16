import React, { useState } from 'react';
import Styles from '../Auth/auth.module.css'
import Card from '../../components/card/Card'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'


import { Link } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput';

function Forgot() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Use the functional form of state update to ensure the latest state is used
        if (name === 'email') {
            setEmail((prevEmail) => value);
        } else if (name === 'password') {
            setPassword((prevPassword) => value);
        }
    }
    const loginUser = () => {
        console.log('Logging in...', { email, password });
    };
    return (


        <>  <Header />
            <div className={`container ${Styles.auth}`}>

                <Card>
                    <p className="title">Forgot Password</p>


                    <form className="form" onSubmit={loginUser}>

                        <input type="email" className="input" placeholder="Email" name="email" required value={email} onChange={handleInputChange} />
                        {/*<input type="password" className="input" placeholder="Password" name='password' required value={password} onChange={handleInputChange} /> */}
                    
                        <button type='submit' className="form-btn">Send an email</button>
                    </form>


                    <div className="logina" style={{ textAlign: 'right', display: 'flex', justifyContent: 'center', gap: '200px' }}>
                        <Link to="/" >Home</Link>
                        <Link to="/login" >Login</Link>
                    </div>


                </Card>
            </div>
            <Footer />
        </>
    )
}

export default Forgot