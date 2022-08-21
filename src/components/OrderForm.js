import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onValue, ref, db } from '../firebase';
export default function OrderForm() {
  const [storeType, setStoreType] = useState('');
  const [catoList, setCatoList] = useState({});
  const [cato, setCato] = useState('Select Product Category');
  const storeId = '2768234';
  useEffect(() => {
    const starCountRef = ref(db, 'Stores/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setStoreType(`${data[storeId].type} - #${data[storeId].id} `);
    });
    const catoRef = ref(db, 'Products/');
    onValue(catoRef, (snapshot) => {
      const data = snapshot.val();
      setCatoList(data.categories);
    });
  }, ['']);
  return (
    <div className="container">
      <form>
        <h3 className="my-1">Enter Order Details</h3>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Select Store Type"
          value={storeType}
          readOnly="true"
        />
        <div className="dropdown ">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {cato}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {Object.values(catoList).map((elem) => {
              return (
                <p className="dropdown-item" onClick={() => setCato(elem)}>
                  {elem}
                </p>
              );
            })}
          </div>
        </div>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Product ID (Machine Type)"
        />
        <div className="dropdown ">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Delivery Mode
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            
                <p className="dropdown-item" onClick={() => setCato(elem)}>
                  Home Delivery
                </p>
                <p className="dropdown-item" onClick={() => setCato(elem)}>
                  TakeAway
                </p>
            
          </div>
        </div>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Delivery Address (If Home Delivery)"
        />
        <input type="text" className="form-control my-2" placeholder="Color" />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Size / Variant"
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Serial Number"
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Customer Phone Number"
        />
        <Link to="/customerInfo">
          <button className="btn btn-primary w-100 mx-auto my-2">
            Continue
          </button>
        </Link>{' '}
      </form>
    </div>
  );
}
