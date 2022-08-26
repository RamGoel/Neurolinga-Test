import React, { useState, useEffect } from 'react';
import { ref, db, onValue, set, push, onChildAdded } from '../firebase';
import { sendMessage, fetchMessages } from '../firebase';

const MessageComponent = (props) => {
  return (
    <div className="messageBody">
      <p className="messageText">Admin : {props.value}</p>
      <sup>{props.time}</sup>
    </div>
  );
};

function Admin(props) {
  //Messages and User Arrays
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState([]);

  //Shows which User is enabled Chatting
  const [activeUser, setActiveUser] = useState({});

  //For Id and Message Inputs
  const [userId, setUserId] = useState();
  const [input, setInput] = useState();

  const messagesRef = ref(db, 'Messages/');

  useEffect(() => {
    var usersRef = ref(db, 'Users/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setAllUsers(data);
    });
  }, [activeUser]);

  const addMember = () => {
    if (userId != null && userId.length == 6) {
      const obj = allUsers.find((elem) => elem.id == userId);
      if (obj != null) {
        if (obj.isAdmin != true) {
          const checkDuplicates = connected.find(
            (elemer) => elemer.id == obj.id
          );
          if (checkDuplicates == null) {
            setActiveUser(obj);
            setConnected([...connected, obj]);
            setUserId('');
          } else {
            alert('Already Added');
            setUserId('');
          }
        } else {
          alert('Cannot Add Admin');
          setUserId('');
        }
      } else {
        alert('No User from this Id');
        setUserId('');
      }
    } else {
      alert('Enter Valid Id');
      setUserId('');
    }
  };

  function fetchMessages(argUser) {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        const userMessages = data.filter(
          (messageIter) => messageIter.id == argUser.id
        );
        setMessages(userMessages);
        setActiveUser(argUser);
      } else {
        alert('no messages');
      }
    });
  }

  return (
    <div className="mainScreen">
      {/* Header */}
      <div className="w-100 text-center text-white p-2 bg-dark">
        Admin Dashboard
      </div>

      {/* ChatBoxes */}
      <div className="downBox">
        {/* Row for Both Divs */}
        <div className="d-flex row" id="divRow">
          {/* Chat Section */}
          <div className="col bg-light rounded border h-100" id="chatSection">
            <div className="d-flex align-items-center p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
                width="25"
                height="25"
                className="mx-2"
              />
              <h5 className="m-0">{activeUser.name || 'User'}</h5>
            </div>
            <div id="messagesBox" className="">
              {messages.map((elem) => {
                return (
                  <MessageComponent value={elem.message} time={elem.time} />
                );
              })}
            </div>
            <div className="d-flex align-items-center justify-content-between w-100  bg-light p-1 ">
              <input
                placeholder="Type Message"
                className="rounded p-2 border-0 w-100"
                required
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                className="btn btn-light  my-auto"
                onClick={() => {
                  if (input != '' && activeUser != '') {
                    sendMessage(activeUser.id, input);
                    setInput('');
                  } else {
                    alert("Input can't be blank or Choose a Chat FIrst");
                  }
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/60/60525.png"
                  height="20"
                  width="20"
                />
              </button>
            </div>
          </div>

          {/* Users List */}
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
                  addMember();
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
                <div
                  onClick={() => fetchMessages(elem)}
                  className="userCard d-flex align-items-center my-2 border w-100 p-1 bg-light active"
                >
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

export default Admin;
