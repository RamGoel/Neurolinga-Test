import React, { useState, useEffect } from 'react';
import { ref, db, onValue, onChildAdded } from '../firebase';

const MessageComponent = (props) => {
  return <p className="messageBody">Admin : {props.value}</p>;
};
export default function User(props) {
  const fetchChat = ref(db, 'Messages/');

  const [messages, setMessages] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const [userId, setUserId] = useState('');
  const [activeUserId, setActiveUserId] = useState('');

  useEffect(() => {
    onValue(fetchChat, function (snapshot) {
      const messagesC = snapshot.val();
      if (messagesC == null) {
        alert('No Messages');
      } else {
        console.log(messagesC);
        setMessages(messagesC);
      }
    });
  }, ['']);

  useEffect(() => {
    onValue(fetchChat, (data) => {
      setMessages(data.val());
      setNewCount(newCount + 1);
    });
  }, [activeUserId]);
  const joinUser = (id) => {
    setActiveUserId(userId);
  };
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
          <h4 className="mx-2">You</h4>

          <div className="row mx-3 w-100 mx-auto border align-items-center justify-content-center">
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
                joinUser();
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                height="20"
                width="20"
              />
            </button>
          </div>
        </div>
        
        <div className="d-flex align-items-center justify-content-center">
        <button
          onClick={() => {
            setNewCount(0);
          }}
        >
          Mark as Read
        </button>
          <button className="btn btn-white border-0 hover-zoom p-0 px-2 mx-2 my-auto">
            <img
              src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-512.png"
              height="25"
              width="25"
            />
            <sup className="bg-primary p-2 text-white rounded-circle">
              {newCount}
            </sup>
          </button>
        </div>
      </div>

      <div className="container downBox">
        <div className="d-flex row">
          <div className="col bg-light rounded border h-100">
            <div id="messagesBox" className="">
              {activeUserId
                ? messages.map((elem) => {
                    if (elem.id == activeUserId) {
                      return <MessageComponent value={elem.message} />;
                    }
                  })
                : 'Enter Your User Id to View Chats'}
            </div>
            <div className="text-center w-100  bg-light p-1 ">
              You can't reply back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
