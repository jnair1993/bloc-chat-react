import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/database';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
