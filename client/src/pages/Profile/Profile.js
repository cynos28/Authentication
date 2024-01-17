import React, { useState } from 'react';
import ProfileImgs from '../../assets/avatarr.png';
import Card from '../../components/card/Card';

import './Profile.css';
import PageMenu from '../../components/pageMenu/PageMenu';

const initialState = {
  name: 'Shehan',
  email: 'shedul0000@gmail.com',
  phone: '',
  bio: '',
  profileImage: '',
  role: '',
  isVerified: false,
};

function Profile() {
  const [profile, setProfile] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImage = (e) => {
    // Assuming update the profileImage property
    const selectedImage = e.target.files[0];
    setProfile({ ...profile, profileImage: selectedImage });
  };

  return (

    <>
      <section>
        <PageMenu />
        <div className="container">

          <h2>Profile</h2>
          <div className="profile">
            <Card cardClass={'card'}>
              <>
                <div className="profile-photo">
                  <div>
                    <img src={ProfileImgs} alt="Profile Image" />
                    <h3>Role : Subscriber </h3>
                  </div>
                </div>
                <form>
                  <p>
                    <label>Change Photo :</label>
                    <input type="file" accept="image/*" onChange={handleImage} />
                  </p>
                  <p>
                    <label>Name:</label>
                    <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
                  </p>

                  <p>
                    <label>Email:</label>
                    <input type="text" name="email" value={profile.email} onChange={handleInputChange} disabled />
                  </p>

                  <p>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
                  </p>

                  <p>
                    <label>Bio:</label>
                    <textarea name="phone" cols={30} rows={10} value={profile.bio} onChange={handleInputChange} />
                  </p>
                  <button className="form-btn " style={{ display: 'block', marginLeft: '40px', width: '340px' }}>Update</button>
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
