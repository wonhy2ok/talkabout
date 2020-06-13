import React,{ Component } from 'react';
import ChatHome from './Chats/ChatHome';
import ChatTitle from './Chats/ChatTitle';
import "../../scss/Chat.scss";
class Chat extends Component {
  render() {
    return (
      <div>
        <div className="ChatTitle">
          <ChatTitle />
          <hr/>
        </div>
        <br/>
        <div className="ChatLog">
          <ChatHome />
        </div>
      </div>
    );
  }
}

export default Chat;