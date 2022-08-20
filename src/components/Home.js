import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className=" text-center mx-auto">
      <div
        className="alert mx-2 alert-warning alert-dismissible fade show d-flex space-between align-items-center"
        role="alert"
      >
        <p className="m-0">
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields below.
        </p>
        <button
          type="button"
          className="btn close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="metrics-data w-75 mx-auto">
        <div className="card border-0 shadow my-2">
          <h1 className="font-weight-bold my-1">20+</h1>
          <p className="text-muted">Customers</p>
        </div>
        <div className="card border-0 shadow my-2">
          <h1 className="font-weight-bold my-1">30+</h1>
          <p className="text-muted">Orders till now.</p>
        </div>
        <div className="card border-0 shadow my-2">
          <h1 className="font-weight-bold my-1">230$+</h1>
          <p className="text-muted">Store Revenue</p>
        </div>
      </div>

      <div className="">
        <button className="btn btn-primary w-75 mx-auto my-2">New Order</button>
        <button className="btn btn-primary w-75 mx-auto my-2">
          View All Orders
        </button>
        <button className="btn btn-primary w-75 mx-auto my-2">
          Store Profile
        </button>
      </div>
    </div>
  );
}
