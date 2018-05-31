import React, { Component } from 'react';
import io from "socket.io-client";

import LoginForm from "./LoginForm";
import ChatContainer from "./chat/ChatContainer";
import {USER_CONNECTED, LOGOUT} from '../events';

const SocketURL = "http://localhost:3301";

class Layout extends Component {

    constructor(props){
        super(props);
        this.state = {
            socket: null,
            user: null
        }
    }

    initSocket = () => {
        const socket = io(SocketURL);
        socket.on("connect", () => {
            console.log(`${socket.id} : connected to the client`);
            this.setState({socket})
        })
    }

    setUser = (user) => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    }

    logout = () => {
        const { socket } =  this.state;
        socket.emit(LOGOUT);
        this.setState({user:null})
    }
    componentWillMount = () => {
        this.initSocket();
    }

    render(){
        const { socket, user } = this.state;
        return(
            <div>
            {
                !user ?
                <LoginForm 
                    socket={socket} 
                    setUser={this.setUser} 
                    />
                :
                <ChatContainer
                    socket={socket}
                    user={user}
                    logout={this.logout}
                    />

            }
                
            </div>
        )
    }
}

export default Layout;
