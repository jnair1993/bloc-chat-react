import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import './App.css';
import { firebase } from '@firebase/app';
import 'firebase/database';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import 'firebase/auth';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-5xzpUCCGC9wVH5VPOg7b6En07RGRPH0",
  authDomain: "bloc-chat-react-31b40.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-31b40.firebaseio.com",
  projectId: "bloc-chat-react-31b40",
  storageBucket: "bloc-chat-react-31b40.appspot.com",
  messagingSenderId: "555479519053"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user_name: null
  };
    this.activeRoom = this.activeRoom.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUserName(user) {
    this.setState({ user_name: user })
  }

  render() {
    const showMessages = this.state.activeRoom;
    const activeUser = this.state.user_name === null ? "Guest" : this.state.user_name.displayName;

    return (
      <div className="App">
        <h1>{this.state.activeRoom.name || "Select A Room"}</h1>
        <User firebase={firebase} setUserName={this.setUserName} activeUser={activeUser} />
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
        : (null)
        }
      </div>
    );
  }
}

export default App;
