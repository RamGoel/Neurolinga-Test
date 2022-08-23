import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onValue, ref, db } from '../firebase';
export default function OrderForm() {
  const [store, setStore] = useState({ id: '', type: '' });
  const [products, setProducts] = useState({ 'Mi TV': [] });
  const [item, setItem] = useState([
    { name: 'Select Product', colors: [], variants: [] },
  ]);
  const storeMiId = '2768234';
  useEffect(() => {
    const starCountRef = ref(db, 'Stores/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setStore({ id: data[storeMiId].id, type: data[storeMiId].type });
    });
    const itemsRef = ref(db, 'Products/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val().items;
      setProducts(data)
      console.log(data);
    });
  }, ['']);
  return (
    <div className="container">
      <form>
        <h3 className="my-1">Enter Order Details</h3>
        <input
          type="text"
          className="form-control my-2"
          value={storeMiId.length > 4 ? store.type : 'Select Store Type'}
          readOnly="true"
        />
        <input
          type="text"
          className="form-control my-2"
          value={storeMiId.length > 4 ? store.id : 'Enter Operator Id'}
          readOnly
        />
        <select className="w-100 form-control">
          {Object.keys(products).map((elem) => {
            return (
              <option
                className="dropdown-item"
                onClick={function () {
                  console.log(products[elem]);
                }}
              >
                {elem}
              </option>
            );
          })}
        </select>
        <select className="w-100 form-control my-2">
          {item.map((elem) => {
            return (
              <option className="dropdown-i" onClick={() => setItem(elem)}>
                {elem.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Product ID"
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Serial Number"
        />
        <select className="w-100 form-control">
          <option
            className="dropdown-item"
            onClick={() => setData({ deliveryMode: 'Home Delivery' })}
          >
            Home Delivery
          </option>
          <option
            className="dropdown-item"
            onClick={() => setData({ deliveryMode: 'Store Delivery' })}
          >
            In-store Delivery
          </option>
        </select>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Delivery Address (If Home Delivery)"
        />
        <select className="w-100 form-control">
          {/* {item.colors.map((elem) => {
            return (
              <option className="dropdown-item" onClick={() => setCato(elem)}>
                {elem}
              </option>
            );
          })} */}
        </select>{' '}
        <select className="w-100 form-control my-2">
          {/* {item.variants.map((elem) => {
            return (
              <option
                className="dropdown-item"
                id=""
                onClick={() => setCato(elem)}
              >
                {elem}
              </option>
            );
          })} */}
        </select>{' '}
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
