import React, { Component } from 'react';
import { VERIFY_USER } from '../events';

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            nickname:"",
            error: ""
        }
    }

    setUser = ({isUser, user}) => {
        if(isUser){
            this.setError("User name taken")
        }
        else {
            console.log(user)
            this.props.setUser(user);
        }
    }

    setError = (error) => {
        this.setState({error});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { socket } = this.props;
        const { nickname } = this.state;

        socket.emit(VERIFY_USER, nickname,this.setUser);

    }

    handleChange = (e) => {
        this.setState({nickname: e.target.value})
    }

    render(){
        return(
            <div className="login">
                <form 
                    onSubmit={this.handleSubmit}
                    className="login-form"
                    >
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input
                        type="text"
                        ref="{(input) => {this.textInput = input}}"
                        id="nickname"
                        onChange={this.handleChange}
                        placeholder = "My Cool NickName"
                        />
                </form>
                <div className="error">
                    {this.state.error ? this.state.error : null}
                </div>
            </div>
        )
    }
}

export default LoginForm;