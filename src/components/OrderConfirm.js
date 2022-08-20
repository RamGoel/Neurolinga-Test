import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderConfirm() {
  return (
    <div className="container bg-white py-2">
      <p className="text-muted">
        Please check all the details before you continue
      </p>
      <div className="card  p-2 my-2">
        <p className="card-title">
          <b>Customer Details</b>
        </p>
        <div className="d-flex customerDetails">
          <div className="list-none">
            <li className="my-2">Name</li>
            <li className="my-2">Street</li>
            <li className="my-2">City</li>
            <li className="my-2">Contact</li>
          </div>
          <div className="list-none">
            <li className="text-muted my-2">Shibjot Singh</li>
            <li className="text-muted my-2">Sake Apartment, NH-4</li>
            <li className="text-muted my-2">Rampur (244901),U.P</li>
            <li className="text-muted my-2">9897XX3453</li>
          </div>
        </div>
      </div>
      <div className="card  p-2 my-2">
        <p className="card-title">
          <b>Amount </b>
        </p>
        <div className="d-flex customerDetails">
          <div className="list-none">
            <li className="my-2">SubTotal</li>
            <li className="my-2">Delivery</li>
            <li className="my-2">Tax Percentage</li>
            <li className="my-2">Total</li>
          </div>
          <div className="list-none">
            <li className="text-muted my-2">6700</li>
            <li className="text-muted my-2">350</li>
            <li className="text-muted my-2">23%</li>
            <li className="text-muted my-2">8240</li>
          </div>
        </div>
      </div>

      <input
        type="text"
        className="form-control my-2"
        placeholder="Payment Method"
      />

      <input
        type="text"
        className="form-control my-2"
        placeholder="Amount Received"
      />
              <button className="btn btn-primary w-100">Complete Order</button>

    </div>
  );
}
