import React, { useState } from 'react';
import { registerWithEmailAndPassword } from '../../configs/firebase';
import './register.css';
export default function RegisterBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  return (
    <>
      <input
        type="text"
        className="register__textBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        className="register__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="register__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="register__btn" onClick={register}>
        Register
      </button>
    </>
  );
}
