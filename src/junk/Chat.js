import React,{ Component } from 'react';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import client from "../Apollo/apolloClient";
import ChatLog from "./Chats/ChatLog";
import Input from "./Chats/Input";

class Chat extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ChatLog />
          <Input />
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default Chat;