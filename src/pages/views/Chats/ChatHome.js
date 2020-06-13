import React,{ Component } from 'react';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import client from "../../Apollo/apolloClient";
import ChatLog from "./ChatLog";
import Input from "./Input";

class ChatHome extends Component {
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

export default ChatHome;