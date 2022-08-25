import React, { useState, useEffect } from 'react';
import { ref, db, onValue } from '../firebase';
export default function Admin(props) {
  const [users, setUsers] = useState([
    'Ankit Singh',
    'ram Goel',
    'Vishal Kumar',
  ]);
  const [connected, setConnected] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    var usersRef = ref(db, 'Users/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(data);
    });
  }, ['']);
  return (
    <div>
      <div className="w-100 text-center text-white p-2 bg-dark">
        Admin Dashboard
      </div>
      <div className="downBox">
        <div className="d-flex row" id="divRow">
          <div className="col bg-light rounded border h-100" id="chatSection">
            <div className="d-flex align-items-center p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
                width="25"
                height="25"
                className="mx-2"
              />
              <h4 className="m-0">{props.name || 'Ankit'}</h4>
            </div>
            <div id="messagesBox" className=""></div>
            <div className="d-flex align-items-center justify-content-between w-100  bg-light p-1 ">
              <input
                placeholder="Type Message"
                className="rounded p-2 border-0 w-100"
              />
              <button className="btn btn-light  my-auto">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/60/60525.png"
                  height="20"
                  width="20"
                />
              </button>
            </div>
          </div>

          <div className="col-4" id="usersList">
            <div className="row w-100 mx-auto border align-items-center justify-content-center">
              <input
                placeholder="Enter User ID"
                className="col form-control"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
              <button
                className=" col-1 btn border-0 mx-2 my-auto"
                onClick={() => {
                  if (userId.length == 6) {
                    const obj = users.find((elem) => elem.id == userId);
                    if (obj != null) {
                      if (obj.isAdmin != true) {
                        setConnected([...connected, obj]);
                      } else {
                        alert('Cannot Add Admin');
                      }
                    } else {
                      alert('No User from this Id');
                    }
                  } else {
                    alert('Invaid Id');
                  }
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                  height="20"
                  width="20"
                />
              </button>
            </div>
            {connected.map((elem) => {
              return (
                <div className=" d-flex align-items-center my-2 border w-100 p-1 bg-light active">
                  <img
                    src={elem.photo}
                    alt=""
                    width="25"
                    height="25"
                    className="mx-2"
                  />
                  <h5 className="m-0">{elem.name}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
