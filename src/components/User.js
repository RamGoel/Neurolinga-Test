import React, { useState, useEffect } from 'react';
import { ref, db, onValue } from '../firebase';

const messageComponent = () => {
  return <p>{props.value}</p>;
};
export default function User(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var messagesRef = ref(db, 'Messages/');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
    });
  }, ['']);

  return (
    <div>
      <div className="w-100 text-center text-white p-2 bg-dark">
        User Dashboard
      </div>
      <div className="d-flex justify-content-between p-2">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            width="25"
            height="25"
            className="mx-2"
          />
          <h4 className="m-0">{props.name || 'Ankit'}</h4>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button className="btn btn-white border-0 hover-zoom p-0 px-2 mx-2 my-auto">
            <img
              src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-512.png"
              height="25"
              width="25"
            />
          </button>
        </div>
      </div>

      <div className="container downBox">
        <div className="d-flex row">
          <div className="col bg-light rounded border h-100">
            <div id="messagesBox" className="">
              {Object.keys(messages[`${activeUser}`]).map}
            </div>
            <div className="d-flex align-items-center justify-content-between w-100  bg-light p-1 ">
              <input
                placeholder="Type Message"
                className="rounded p-2 border-0 w-100"
              />
              <button className="btn btn-light   my-auto">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/60/60525.png"
                  height="20"
                  width="20"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
