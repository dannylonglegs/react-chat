import React, { Component } from 'react';
import './App.css';
import Chat from "./Chat.js";
import io from 'socket.io-client';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h2>React Chat</h2>
        </div>
        <Chat>
          {this.props.children}
        </Chat>
      </div>
    );
  }
};

export default App;
