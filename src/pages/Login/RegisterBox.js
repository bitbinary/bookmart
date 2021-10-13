import React, { useState } from 'react';
import { registerWithEmailAndPassword } from '../../configs/firebase';
import './register.css';
export default function RegisterBox() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showAlert, setShowAlert] = useState(false);

   const [name, setName] = useState('');
   const register = () => {
      if (!name) setShowAlert('Please enter name');
      else if (password !== confirmPassword)
         setShowAlert("Passwords don't match");
      else if (!email) setShowAlert('Please enter email');
      else if (!password) setShowAlert('Please enter password');
      else registerWithEmailAndPassword(name, email, password, confirmPassword);
   };
   return (
      <>
         {showAlert && (
            <div style={{ color: 'red', textAlign: 'center' }}>
               *{showAlert}
            </div>
         )}

         <input
            type='text'
            className='register__textBox'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Full Name'
         />
         <input
            type='text'
            className='register__textBox'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail Address'
         />

         <input
            type='password'
            className='register__textBox'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
         />

         <input
            type='password'
            className='login__textBox'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
         />
         <button className='register__btn' onClick={register}>
            Register
         </button>
      </>
   );
}
