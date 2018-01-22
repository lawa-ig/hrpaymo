import React from 'react';

// ---------- Sub Components ---------- //
import ChatMessagesList from './ChatMessagesList.jsx';
import ChatBox from './ChatBox.jsx';
import MessagesBadge from './MessagesBadge.jsx';

// ---------- Material UI ---------- //
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import { Link } from 'react-router-dom';

// R E D U X //
import { connect } from 'react-redux';
import { actionClearMessagesForUser,
         actionNewMessage 
                                    } from './Reducers/Actions.js'

class ChatWindow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            messageInput: {
                username: 'you',
                time: 'just now',
                text: ''
            },
            chats: []
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
    }

    componentDidMount(){
        this.receiveMessages();
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.state.chats && this.state.chats.length) {
                let maxIndex = this.state.chats.length - 1;
                if (document.getElementById(maxIndex)) {
                    document.getElementById(maxIndex).scrollIntoView()                    
                }
            }
        }, 0);
    }   

      handleOpen() {
        this.setState({
            open: true
        });   
        this.scrollToBottom();
        if (this.props.messages) {
            var keepTheseMessages = this.props.messages.filter(msg => {
                return msg.user !== this.props.friend.username
            })
            this.props.dispatch(actionClearMessagesForUser(keepTheseMessages));
        }
      };
    
      handleClose() {
        this.setState({
            open: false,
        });
          if (this.props.messages) {
              var keepTheseMessages = this.props.messages.filter(msg => {
                  return msg.user !== this.props.friend.username
              })
              this.props.dispatch(actionClearMessagesForUser(keepTheseMessages));
          }
      };

    handleInputChanges(event) {
        const { messageInput } = this.state;
        messageInput.text = event.target.value;
        this.setState({ messageInput });
    }

    appendChat(messageInput) {
        const { chats } = this.state;
        this.setState({
            chats: [...chats, messageInput],
            messageInput: {
                username: 'you',
                time: 'just now',
                text: ''
            },
        });
        this.scrollToBottom();
    }

    receiveChat(messageInput) {
        const { chats } = this.state;
        if (this.props.messages && this.props.messages.length) {
            this.props.dispatch(actionNewMessage([...this.props.messages, messageInput]));            
        } else {
            this.props.dispatch(actionNewMessage([messageInput]));                        
        }
        this.setState({
            chats: [...chats, messageInput]
        });
        this.scrollToBottom();
        this.forceUpdate();
    }

    sendMsg(msgInput) {
        this.props.socket.emit("private", 
            { msg: msgInput, to: this.props.friend.username, from: this.props.loggedInUserName}
        );
    }

    handleEnterKeyPress(event) {
        if (event.key == 'Enter') {
            const { messageInput } = this.state;
            this.appendChat(messageInput);
            this.sendMsg(messageInput);
        }

    }

    receiveMessages() {
        this.props.socket.on('private', (data) => {
            var message = {
                user: data.from, 
                text: data.msg, 
                time: 'just now'
            }
            this.receiveChat(message);
        })
    }

    render(){
        const friendName = this.props.friend.first_name + ' ' + this.props.friend.last_name;
        const modalTitle = `Chat with ${friendName}`;

        const actions = [
            <TextField
                value={this.state.messageInput.text}
                className="send-msg-box"
                hintText="Send a message"
                fullWidth={true}
                onChange={this.handleInputChanges}
                onKeyPress={this.handleEnterKeyPress}
            />,
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose.bind(this)}
            />,
          ];

        const customContentStyle = {
            width: '50%',
            'maxHeight': '50%',
            'minHeight': '50%'
        };

        let onlineStyles = {
            boxShadow: '0 0 8px green'
        };

        let inactiveStyles = {
            opacity: '.6'
        };

        return (            
            <div className='chat-box-window'>
                <ListItem
                    style={this.props.online ? onlineStyles : inactiveStyles}
                    disabled={!this.props.online}
                    primaryText={friendName}
                    leftAvatar={<Avatar src={this.props.friend.avatar_url} />}
                    rightIcon={<MessagesBadge 
                        friendName={this.props.friend.username}
                        newMessages={this.props.newMessages}
                        online={this.props.online}
                        style={this.props.online ? { color: 'black' } : { opacity: 0 }}/>}
                    onClick={this.handleOpen.bind(this)}
                />
                <Divider inset={true} />
                <Dialog
                  id="chat-modal"
                  title={modalTitle}
                  actions={actions}
                  open={this.state.open}
                  actions={actions}
                  modal={false}
                  onRequestClose={this.handleClose}
                  contentStyle={customContentStyle}
                  chats={this.state.chats} 
                  autoScrollBodyContent={true}
                >
                <ChatBox 
                  id="chat-box-area"
                  friend={this.props.friend} 
                  uiAvatar={this.props.uiAvatar}
                  chats={this.state.chats} 
                />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profileInfo: state.profileInfo,
        socket: state.socket,
        messages: state.messages,
        loggedInUserName: state.userInfo.username,
        actionClearMessagesForUser,
        actionNewMessage,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ actionNewMessage }, dispatch);
}


export default connect(mapStateToProps)(ChatWindow);