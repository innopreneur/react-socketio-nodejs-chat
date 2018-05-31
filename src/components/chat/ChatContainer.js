import React, { Component } from 'react';
import { MESSAGE_SENT, TYPING } from '../../events';
import Sidebar from './Sidebar';
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import ChatHeading from "./ChatHeading";

class ChatContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeChat: null,
            chats: []
        }
    }

    setActiveChat = (activeChat) => {
        this.setState({activeChat});
    }

    sendMessage = (chatId, message) => {
        const {socket} = this.props;
        socket.emit(MESSAGE_SENT, {chatId, message});
    }
    
    sendTyping = (chatId, isTyping) => {
        const {socket} = this.props;
        socket.emit(TYPING, {chatId, isTyping});
    }
    render(){
        const {socket, user, logout} = this.props;
        const {activeChat, chats} = this.state;

        return(
            <div className="container">
                <Sidebar
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                    />
                <ChatHeading name={activeChat.name} />
                <Messages
                    messages={activeChat.messages}
                    user={activeChat.user}
                    typingUsers={activeChat.typingUsers}
                    />
                <MessageInput
                    sendMessage={(message) => {
                        this.sendMessage(activeChat.id, message);
                    }}
                    sendTyping = {(isTyping) => {
                        this.sendTyping(activeChat.id, isTyping);
                    }}
                    />
            </div>
        )
    }
}

export default ChatContainer;