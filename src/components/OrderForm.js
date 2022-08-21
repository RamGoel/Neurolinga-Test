import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function OrderForm() {
  return (
    <div className="container">
      <form>
        <h3 className="my-1">Enter Order Details</h3>
        <input type="text" className="form-control my-2" placeholder="Select Store Type" />
        <input type="text" className="form-control my-2" placeholder="Select Product Category" />
        <input type="text" className="form-control my-2" placeholder="Product ID (Machine Type)" />
        <input type="text" className="form-control my-2" placeholder="Delivery Mode" />
        <input type="text" className="form-control my-2" placeholder="Delivery Address (If Home Delivery)" />
        <input type="text" className="form-control my-2" placeholder="Color" />
        <input type="text" className="form-control my-2" placeholder="Size / Variant" />
        <input type="text" className="form-control my-2" placeholder="Serial Number" />
        <input type="text" className="form-control my-2" placeholder="Customer Phone Number" />

        <Link to="/customerInfo">
        <button className="btn btn-primary w-100 mx-auto my-2">Continue</button>
      </Link>{' '}
      </form>
    </div>
  );
}
