import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatWindow from './ChatWindow.jsx';

// ---------- Web Socket ---------- //
import io from 'socket.io-client';

class ContactsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            socket: io(),
            friendsOnline: []
        }
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps() {
        this.state.socket.emit("init",
            {loggedInUser: this.props.loggedInUsername}
        );
        this.checkIfFriendsOnline();
    }

    checkIfFriendsOnline() {
        this.state.socket.on('friendsOnline', (friendNames) => {
            if (this.state.friendsOnline !== friendNames) {
                console.log('friends online are', friendNames);
                this.setState({ friendsOnline: friendNames })
            }
        })
    }
    
    render() {
        return (
            <div>
                <List>
                <Subheader>Friends</Subheader>
                {
                    this.props.friends && this.props.friends.length &&
                    this.props.friends
                    .map((friend, i) => {
                        let friendOnline = this.state.friendsOnline.includes(friend.username);
                        return <ChatWindow
                                key={i} 
                                friend={friend} 
                                uiAvatar={this.props.uiAvatar}
                                socket={this.state.socket}
                                loggedInUserName={this.props.loggedInUsername}
                                online={friendOnline}
                            />;
                    })
                }
                </List>
            </div>
        );
    }
};

export default ContactsList;