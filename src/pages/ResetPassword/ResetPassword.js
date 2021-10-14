import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from '../../configs/firebase';
import './resetPassword.css';
function ResetPassword() {
   const [email, setEmail] = useState('');
   const [showAlert, setShowAlert] = useState(false);

   const [user, loading] = useAuthState(auth);
   const history = useHistory();

   const sendEmail = (email) => {
      sendPasswordResetEmail(email);
      setShowAlert(true);
   };

   useEffect(() => {
      if (loading) return;
      if (user) history.replace('/');
   }, [user, loading, history]);
   return (
      <div className='reset'>
         <div className='reset__container'>
            <input
               type='text'
               className='reset__textBox'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder='E-mail Address'
            />
            <button className='reset__btn' onClick={() => sendEmail(email)}>
               Send password reset email
            </button>
            <div>
               Don't have an account? <Link to='/login'>Register</Link> now.
            </div>
            {showAlert && (
               <>
                  <div style={{ color: 'blue' }}>
                     *Link sent to the given e-mail.
                  </div>
                  <div style={{ color: 'red' }}>
                     *Verify your e-mail id, if not found.
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
export default ResetPassword;
