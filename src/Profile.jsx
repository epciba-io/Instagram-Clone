import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
  const[profile,setProfile]= useState(null);
  const[follwers,setFollowers]=useState([]);
  const[unfollowed,setUnfollowed]=useState(0);
  
  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then(data => {
        setProfile(data.data);
        console.log(data.data);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3000/followers')
      .then(data => setFollowers(data.data))
      .catch(err => console.log(err));
  }, [unfollowed]);

  function handleOnChange(e){
    setProfile(prev => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  }

  const handleUpdate = async()=>{
    axios.put('http://localhost:3000/profile', profile)
    .then(console.log('Profile updated'))
    .catch(err => console.log(err))
  }

  const handleUnfollow = async(id)=>{
    axios.delete(`http://localhost:3000/followers/${id}`)
    .then(console.log("Follower removed"))
    .then(() => setUnfollowed(!unfollowed))
    .catch(err => console.log(err))

 }



  

  return (
    <div className="m-5">
      {profile ? (
        <div  className="m-5">
          <img className="profile rounded-circle" src={profile.profilePic} alt="profile_pic" />
          <h5>{profile.username}</h5>
          <input type="text"
            value={profile.username}
            name="username"
            className="form-control my-4"
            onChange={handleOnChange}
          />

          <input type="text" 
          name="profilePic" 
          value={profile.profilePic} 
          className="form-control"
          onChange={handleOnChange}
          />
          <button className= "btn btn-primary my-3" onClick={handleUpdate}>
            Update Profile
          </button>
          
        </div>
      ) : (
        <div>Loading Profile</div>
      )}

      {follwers.length > 0 ? (
        follwers.map((follower) => (
          <div className="d-flex align-items-center my-2" key={follower.id}>
  <span>{follower.username}</span>

  <button 
  onClick={() => handleUnfollow(follower.id)}
    className="btn btn-secondary ms-auto">
    Unfollow
  </button>
</div>
        ))
      ) : (
        <div>No followers found.</div>
      )}
    </div>
  );
}

export default Profile