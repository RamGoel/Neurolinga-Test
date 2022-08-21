import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  return (
    <div className="container d-flex text-center" style={{ height: '100vh' }}>
      <div className=" my-auto">
        <p className=" my-1">Payment has been Completed</p>
        <p className="text-muted">
          Payment receipt has been sent to the customer via Mail/Phone, print
          the receipt copy (if required).
        </p>

        <div className="btn-group w-100">
          <button className="btn btn-primary w-100">print slip</button>
          <button className="btn border w-100">
            <Link to="/home" className="text-dark no-decor">
              go home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
