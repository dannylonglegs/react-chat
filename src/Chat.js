import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import MessageList from "./MessageList.js"

var socket = io(':3000');

class Chat extends Component {
  constructor(props) {
    super(props); 
     this.state = {
        usernameChosen: false,
        username: "",
        individualMessage: "",
        messageObject: {}
    };
  }
  
  _handleUsername(event){
    event.preventDefault();
    this.setState({
      username: event.target.value
    });
    
  };

  _submitUsername(event){
    event.preventDefault();
    this.setState({
      usernameChosen: true
    });
    socket.emit('username', this.state.username)
  };

  _changeUsername(event){
    event.preventDefault();
    this.setState({
      usernameChosen: false,
      username: ""
    });
  };

  _handleMessage(event){
    event.preventDefault();
    var value = event.target.value;
    this.setState({
      individualMessage: value,
      messageObject: {
        username: this.state.username,
        message: value
      }
    })
  };
  
  _submitMessage(event){
    event.preventDefault();
      this.setState({
        individualMessage: ""
      })
    socket.emit('chat message', this.state.messageObject)
    
  }
 

  render() {
  
    if(this.state.usernameChosen == false){
       return (
    <div>
      <MessageList />
      <p>Please enter a username!</p>
      <form action="" onSubmit={this._submitUsername.bind(this)}>
        <input autoComplete="off" type="text" onChange={this._handleUsername.bind(this)} /><button>Enter a Username</button>
      </form>
      
    </div>
    );
  }
  
   if(this.state.usernameChosen == true){
       return (
    <div>
      <MessageList

       />
      
      <form 
        action="" 
        onSubmit={this._submitMessage.bind(this)}
      >
        <input 
        
          type="text"
          onChange={this._handleMessage.bind(this)}
         />
        <button>Enter</button>
      </form>
      <p>You are now posting as {this.state.username}</p>
      <button onClick={this._changeUsername.bind(this)}>Change Username</button>
    </div>
    );
    }
  }
}

export default Chat;