import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  return (
    <div className="text-center w-75 mx-auto">
      <h3>Login with Mi Account</h3>
      <input placeholder="Mi Account Id" className="form-control my-2 p-1" />
      <input placeholder="Password" className="form-control my-2 p-1" />

      <button className="btn btn-primary w-100">Continue</button>
    </div>
  );
}
