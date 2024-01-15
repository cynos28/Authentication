import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './PasswordInput.css'; // Assuming the correct path to your CSS file

function PasswordInput({ placeholder, value, onChange, name, onPaste, strength }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pI">
      <div className={showPassword ? 'text' : 'Password'}>
        <input
          type={showPassword ? 'text' : 'password'}
          className="input"
          placeholder={placeholder}
          name={name}
          required
          value={value}
          onChange={onChange}
          onPaste={onPaste}
        />
        <div className="icon" onClick={togglePassword}>
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </div>
       
      </div>
      <div className="password-strength">{strength}</div>
    </div>
  );
}

export default PasswordInput;
