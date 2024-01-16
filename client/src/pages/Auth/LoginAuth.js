import React, { useState } from 'react';
import Styles from '../Auth/auth.module.css'
import Card from '../../components/card/Card'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'


import { Link } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput';

function LoginAuth() {
    const [LoginCode, setLoginCode] = useState("");
   

    const handleInputChange = (e) => {
        const { name, value } = e.target;

      
    }
    const loginUser = () => {
      
    };
    return (


        <>  <Header />
            <div className={`container ${Styles.auth}`}>

                <Card>
                    <p className="title">Enter Verification Code</p>


                    <form className="form" onSubmit={loginUser}>

                        <input type="text" className="input" placeholder="Verification Code" name="LoginCode" required value={LoginCode} onChange={(e) => setLoginCode(e.target.value)} />
                        {/*<input type="password" className="input" placeholder="Password" name='password' required value={password} onChange={handleInputChange} /> */}
                    
                        <button type='submit' className="form-btn">Proceed to login</button>
                        <p style={{fontSize:"10px", alignItems:"center" , marginTop:"-10px"}}>&nbsp; &nbsp; Check your email for Verification code</p>
                    </form>


                    <div className="logina" style={{ textAlign: 'right', display: 'flex', justifyContent: 'center', gap: '200px' }}>
                        <Link to="/" >Home</Link>
                        <Link to="/login" style={{color:"#3468C0", fontWeight:"bold"}} >Resend Code</Link>
                    </div>


                </Card>
            </div>
            <Footer />
        </>
    )
}

export default LoginAuth