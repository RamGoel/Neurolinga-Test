import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderSummary(props) {
  return (
    <div className="container bg-white py-2">
      <div className="card  p-2 my-2">
        <p className="card-title">
          <b>Customer Details</b>
        </p>
        <div className="d-flex customerDetails">
          <div className="list-none">
            <li className="my-2">Name</li>
            <li className="my-2">Street</li>
            <li className="my-2">City</li>
            <li className="my-2">Pincode</li>
            <li className="my-2">State</li>
            <li className="my-2">Email</li>
            <li className="my-2">Contact</li>
          </div>
          <div className="list-none">
            <li className="text-muted my-2">{props.data.name}</li>
            <li className="text-muted my-2">{props.data.street}</li>
            <li className="text-muted my-2">{props.data.city}</li>
            <li className="text-muted my-2">{props.data.pincode}</li>
            <li className="text-muted my-2">{props.data.state}</li>
            <li className="text-muted my-2">{props.data.email}</li>
            <li className="text-muted my-2">{props.data.contact}</li>
          </div>
        </div>
      </div>
      <div className="card  p-2 my-2">
        <p className="card-title">
          <b>Transcation Details</b>
        </p>
        <div className="d-flex customerDetails">
          <div className="list-none">
            <li className="my-2">SubTotal</li>
            <li className="my-2">Delivery</li>
            <li className="my-2">Tax Percentage</li>
            <li className="my-2">Transaction Id</li>
            <li className="my-2">Transaction Date</li>
            <li className="my-2">Transaction Time</li>
            <li className="my-2">Payment Method</li>
            <li className="my-2">Invoice ID</li>
            <li className="my-2">Total</li>
          </div>
          <div className="list-none">
            <li className="text-muted my-2">{props.data.subTotal}</li>
            <li className="text-muted my-2">{props.data.deliveryCharge}</li>
            <li className="text-muted my-2">{props.data.taxPercentage}</li>
            <li className="text-muted my-2">{props.data.transactionId}</li>
            <li className="text-muted my-2">{props.data.transactionDate}</li>
            <li className="text-muted my-2">{props.data.transactionTime}</li>
            <li className="text-muted my-2">{props.data.paymentMethod}</li>
            <li className="text-muted my-2">{props.data.invoiceId}</li>
            <li className="text-muted my-2">{props.data.totalAmount}</li>
          </div>
        </div>
      </div>
      <div className="card  p-2 my-2">
        <p className="card-title">
          <b>Product Details</b>
        </p>
        <div className="d-flex customerDetails">
          <div className="list-none">
            <li className="my-2">Name</li>
            <li className="my-2">Service Order ID</li>
            <li className="my-2">Category</li>
            <li className="my-2">Color</li>
            <li className="my-2">Size/Variant</li>
            <li className="my-2">Serial Number</li>
            <li className="my-2">Delivery Method</li>
          </div>
          <div className="list-none">
            <li className="text-muted my-2">{props.data.itemName}</li>
            <li className="text-muted my-2">{props.data.itemServiceId}</li>
            <li className="text-muted my-2">{props.data.itemCategory}</li>
            <li className="text-muted my-2">{props.data.itemColor}</li>
            <li className="text-muted my-2">{props.data.itemSize}</li>
            <li className="text-muted my-2">{props.data.itemSerialNumber}</li>
            <li className="text-muted my-2">{props.data.itemDeliveryMethod}</li>
          </div>
        </div>
      </div>
      <div className="btn-group w-100">
        <button className="btn btn-primary w-100">Print Slip</button>
        <button className="btn border w-100">Go Back</button>
      </div>{' '}
    </div>
  );
}
