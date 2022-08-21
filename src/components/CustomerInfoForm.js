import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function CustomerInfoForm() {
  return (
    <div className="container">
      <form>
        <h3 className="my-1">Enter Customer Details</h3>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Operator ID"
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Customer Name"
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Email Address"
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Mode of Business Communications"
        />
        <div>
          <input type="checkbox" />
          <span className="mx-2 my-0">Save for Future Orders </span>
        </div>
        <Link to="/confirm">
          <button className="btn btn-primary w-100 mx-auto my-2">
            Continue
          </button>
        </Link>
      </form>
    </div>
  );
}
