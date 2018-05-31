import React, { Component } from 'react';

class ChatContainer extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        const {socket, user, logout} = this.props;

        return(
            <div className="container">
                <Sidebar
                    
                    />
            </div>
        )
    }
}

export default ChatContainer;