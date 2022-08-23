import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebase';
export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  return (
    <div style={{ height: '100vh' }} className="d-flex align-tems-center">
      <div className="text-center container my-auto">
        <h3>Login with Mi Account</h3>
        <input
          placeholder="Mi Account email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="form-control my-2 p-1"
        />
        <input
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          className="form-control my-2 p-1"
        />
        <button
          className="btn btn-primary w-100 mx-auto my-2"
          onClick={() => {
            if (pwd.length == 6 && email.includes('@')) {
              loginUser(email, pwd);
            } else {
              alert('Check Details & Try Again!');
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
