import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const OrderCard = (props) => {
  return (
    <Link to="/orderSummary" className="text-dark no-decor">
      <div className="card  p-2 my-2">
        <div className="d-flex customerDetails">
          <div className="list-none">
            <li className="my-2">
              <b>{props.data.name}</b>
            </li>
            <li className="my-2">{props.data.key[0]}</li>
            <li className="my-2">{props.data.key[1]}</li>
            <li className="my-2">{props.data.key[2]}</li>
          </div>
          <div className="list-none">
            <li className="text-muted my-2">
              <b>{props.data.price}</b>
            </li>
            <li className="text-muted my-2">{props.data.values[0]}</li>
            <li className="text-muted my-2">{props.data.values[1]}</li>
            <li className="text-muted my-2">{props.data.values[2]}</li>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default function OrderList() {
  const [customers, setCustomers] = useState([
    {
      name: 'Ashok Singh',
      price: '8240$',
      key: ['Service Order Number', 'Invoice Number', 'Date'],
      values: ['#Mi34BS2345', '#Mi34BS2345', '23/7/2022'],
    },
    {
      name: 'Ashok Singh',
      price: '8240$',
      key: ['Service Order Number', 'Invoice Number', 'Date'],
      values: ['#Mi34BS2345', '#Mi34BS2345', '23/7/2022'],
    },
    {
      name: 'Ashok Singh',
      price: '8240$',
      key: ['Service Order Number', 'Invoice Number', 'Date'],
      values: ['#Mi34BS2345', '#Mi34BS2345', '23/7/2022'],
    },
    {
      name: 'Ashok Singh',
      price: '8240$',
      key: ['Service Order Number', 'Invoice Number', 'Date'],
      values: ['#Mi34BS2345', '#Mi34BS2345', '23/7/2022'],
    },
  ]);
  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <input placeholder="Search by Name" className="form-control my-2 p-1" />
        <span className="mx-1">Date</span>
      </div>
      <div>
        {customers.map((elem) => {
          return <OrderCard data={elem} />;
        })}
      </div>
    </div>
  );
}
