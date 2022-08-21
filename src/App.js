import React from 'react';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import OrderForm from './components/OrderForm';
import CustomerInfoForm from './components/CustomerInfoForm';
import OrderConfirm from './components/OrderConfirm';
import Confirmation from './components/Confirmation';
import OrderList from './components/OrderList';
import OrderSummary from './components/OrderSummary';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orderConfirm" element={<OrderConfirm />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route path="/orderSummary" element={<OrderSummary data={} />} />
        <Route path="/orderForm" element={<OrderForm />} />
        <Route path="/customerInfo" element={<CustomerInfoForm />} />
        <Route path="/confirm" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}
