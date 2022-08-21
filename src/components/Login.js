import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div className="text-center w-75 mx-auto">
      <h3>Login with Mi Account</h3>
      <input placeholder="Mi Account Id" className="form-control my-2 p-1" />
      <input placeholder="Password" className="form-control my-2 p-1" />
      <Link to="/home">
        <button className="btn btn-primary w-100 mx-auto my-2">Continue</button>
      </Link>{' '}
    </div>
  );
}
