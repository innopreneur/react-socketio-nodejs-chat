import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component {
	render() {
		const { chats, activeChat, user, setActiveChat, logout } = this.props
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">React Chat <FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>
					</div>
					<div className="search">
						<i className="search-icon"><FASearch /></i>
						<input placeholder="Search" type="text"/>
						<div className="plus"></div>
					</div>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						chats.map((chat)=>{
                            //chat should have a name
							if(chat.name){
                                //get the last message from the chats
								const lastMessage = chat.messages[chat.messages.length - 1];

								//find a notloggedin user
								const user = chat.users.find(({name})=>{
									return name !== this.props.name
								}) || { name:"Community" }

								//if this chat is active chat,add classname 'active'
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								
								//
								return(
								//on clicking this chat,set this chat to activechat in parent container
								<div 
									key={chat.id} 
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveChat(chat) } }
									>
									<div className="user-photo">{user.name[0].toUpperCase()}</div>
	
									<div className="user-info">
										<div className="name">{user.name}</div>
										{//if last message is available,display last message
										} 
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>
									
								</div>
							)
							}

							return null
						})	
						}
						
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							<MdEject/>	
						</div>
					</div>
				</div>
		);
	}
}