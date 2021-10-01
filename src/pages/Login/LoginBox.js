import React, { useState } from 'react';
import { signInWithEmailAndPassword } from '../../configs/firebase';
import './login.css';
export default function LoginBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <input
        type="text"
        className="login__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="login__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="login__btn"
        onClick={() => signInWithEmailAndPassword(email, password)}
      >
        Login
      </button>
    </>
  );
}
