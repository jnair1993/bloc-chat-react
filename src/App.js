import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/database';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room) {
    this.setState({activeRoom: room });
  }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
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
