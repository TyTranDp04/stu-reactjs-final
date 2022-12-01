import React from 'react'
import HomeContent from '../../components/Home'
import Layout from '../../layout'
import '.changPassword.css';
const changePassword = () => {
  return (
    <form action="">
    <div class="container">
      <h1>CHANGE PASSWORD</h1>
      <p>Please enter the information below.</p>
      <hr />
      <label for="email"><b>Old Password</b></label>
      <input type="text" placeholder="Import Old Password" name="oldPassword" required />
      <label for="psw"><b>New Password</b></label>
      <div class="container_show">
          <input
        type="password"
        placeholder="Import New Password"
        name="newPassword"
        required
      />
      <span class="show-btn"><i class="fas fa-eye"></i></span>
      </div>
      
      <label for="psw-repeat"><b>Confirm New Password</b></label>
      <input
        type="password"
        placeholder="Confirm New Password"
        name="psw-repeat"
        required
      />
      <div class="clearf  ix">
        <button type="submit" class="signupbtn">Change Password</button>
      </div>
    </div>
  </form>
  )
}

export default HomePage