import React, { useState } from 'react';

import Card from '../../components/card/Card';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import './ChangePassword.css';
import PageMenu from '../../components/pageMenu/PageMenu';

const initialState = {
    oldPassword: '',
    password: '',
    password2: '',
};

function ChangePassword() {
    const [formData, setFormData] = useState(initialState);

    const { oldPassword, password, password2 } = formData;

    const handleInputChange = (e) => {
        // You should update the state here based on the input changes
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <>
            <section>
                <PageMenu />
                
                    <h2 style={{marginLeft:"300px"}}>Change Password</h2>
                    <div className="container " style={{width:"500px",marginTop:"20px",justifyContent:"center"}}>
                    <div className="profile">
                        <Card cardClass={'card'} style={{}}>
                            <>
                                <form style={{marginLeft:"-30px"}}>
                                    <p>
                                        <label>Current Password:</label>
                                        <PasswordInput
                                            placeholder="Current password"
                                            name="oldPassword"
                                            required
                                            value={oldPassword}
                                            onChange={handleInputChange}
                                        />
                                    </p>

                                    <p>
                                        <label>New Password:</label>
                                        <PasswordInput
                                            placeholder="New password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </p>

                                    <p>
                                        <label>Confirm Password:</label>
                                        <PasswordInput
                                            placeholder="Confirm password"
                                            name="password2"
                                            required
                                            value={password2}
                                            onChange={handleInputChange}
                                        />
                                    </p>

                                    <button
    className="form-btn"
    style={{ display: 'block', marginLeft: '40px', width: '280px' }}
>
    Update
</button>
                                </form>
                            </>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChangePassword;
