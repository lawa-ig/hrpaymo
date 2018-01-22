import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatWindow from './ChatWindow.jsx';

//     R E D U X        //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUpdateFriendsOnline, 
         actionOpenSocket,
         actionSetChatWindowCount} from './Reducers/Actions.js'


// ---------- Web Socket ---------- //
import io from 'socket.io-client';

class ContactsList extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(actionOpenSocket());
        setTimeout(e => {
            this.checkIfFriendsOnline();
        }, 400);
        setTimeout(e => {
            this.props.socket.emit("init",
                { loggedInUser: this.props.userInfo.username }
            );
        }, 500);
        setTimeout(e => {
            this.props.dispatch(actionSetChatWindowCount(this.props.friends.length));                 
        }, 600);
    }

    componentWillReceiveProps() {
        
    }

    checkIfFriendsOnline() {
        this.props.socket.on('friendsOnline', (friendNames) => {
            if (this.props.friendsOnline !== friendNames) {
                if (friendNames && friendNames.length) {
                    this.props.dispatch(actionUpdateFriendsOnline( friendNames ));
                }
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
                        let friendOnline = this.props.friendsOnline ? this.props.friendsOnline.includes(friend.username) : false;                   
                        return <ChatWindow
                                key={i} 
                                friend={friend} 
                                uiAvatar={this.props.uiAvatar}
                                online={friendOnline}
                                newMessage={this.props.newMessage}
                                newMessages={this.props.newMessages ? this.props.newMessages.filter(message => message.user === friend.username) : []}
                            />;
                    })
                }
                </List>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        friends: state.friends,
        socket: state.socket,
        friendsOnline: state.friendsOnline,
        userInfo: state.userInfo,
        newMessages: state.messages,
        chatWindowCount: state.chatWindowCount,
        actionUpdateFriendsOnline,
        actionOpenSocket,
        actionSetChatWindowCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ actionUpdateFriendsOnline }, dispatch);
}

export default connect(mapStateToProps)(ContactsList);