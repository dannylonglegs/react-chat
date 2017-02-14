import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io(':3000');

class MessageList extends Component {
  constructor(props) {
    super(); 
    this.state = {
      messagesToBeDisplayed: [],
      test: ""
    }
  }

   componentDidMount(){
    var that = this;
    socket.on('chat message', function(msg){
        var msgArray = that.state.messagesToBeDisplayed;
        var message = [msg];
        that.setState({
          messagesToBeDisplayed: msgArray.concat(message)
        })
      });
       
  }

  // _messageReciever(){
  //   var newMessage = [];
  //   socket.on('chat message', function(msg){
  //       var newMessage = [{username: msg.username, message: msg.message}];
  //     })
  //   var msgArray = this.state.messagesToBeDisplayed;
  //   this.setState({
  //     messagesToBeDisplayed: msgArray.concat(newMessage)
  //   })
  // };


  render() {
    const messages = this.state.messagesToBeDisplayed;
    return (
        <div>
            <ul>
              {messages.map((message, i) => 
                    <li key={i}>
                        <span className="username-tag">{message.username}: {message.message}</span>
                    </li>
                )}
            </ul>
        </div>
    );
  }
};

export default MessageList;
