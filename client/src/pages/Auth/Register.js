import React, { useState } from 'react';
import Styles from '../Auth/auth.module.css';
import Card from '../../components/card/CardR';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/passwordInput/PasswordInput';

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const [passwordStrength, setPasswordStrength] = useState('');

  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Registering...', { name, email, password, password2 });
  };

  // Password Strength Calculation
  const calculatePasswordStrength = (password) => {
   // Check length
  if (password.length < 8) {
    setPasswordStrength("Password is too short");
    return;
  }

  // Uppercase letters
  if (/[A-Z]/.test(password)) {
    // Lowercase letters
    if (/[a-z]/.test(password)) {
      // Numbers
      if (/\d/.test(password)) {
        // Special characters
        if (/[^A-Za-z0-9]/.test(password)) {
          setPasswordStrength("Strong password!");
        } else {
          setPasswordStrength("Include special characters");
        }
      } else {
        setPasswordStrength("Include numbers");
      }
    } else {
      setPasswordStrength("Include lowercase letters");
    }
  } else {
    setPasswordStrength("Include uppercase letters");
  }

  };

  return (
    <>
      <Header />
      <div className={`container ${Styles.auth}`}>
        <Card>
          <p className="title">Create an account</p>
          <form className="form" onSubmit={registerUser}>
            <input
              type="text"
              className="input"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              strength={passwordStrength}
            />

            <PasswordInput
              placeholder="Confirm password"
              name="password2"
              required
              value={password2}
              onChange={handleInputChange}
            />
            <p className="page-link"></p>
            <button type="submit" className="form-btn">
              Sign up
            </button>
          </form>
          <p className="sign-up-label">
            Already have an account?
            <span className="sign-up-link">
              <Link to="/login">Log in</Link>
            </span>
          </p>
          <div ><br></br>
            <Link to="/">Home</Link>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default Register;
