import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { connect } from 'react-redux';

var showStyle = {
    visibility: 'visible'
}

var hideStyle = {
    display: 'none'
}

const MessagesBadge = (props) => (

    <div className="notification-div">
        <Badge
            badgeContent={props.newMessages && props.friendName && props.chatWindowCount 
                ? props.newMessages.filter(message => message.user === props.friendName).length  / props.chatWindowCount
                : props.newMessages ? props.newMessages.length / props.chatWindowCount 
                : 0}
            secondary={true}
            badgeStyle={props.newMessages && props.newMessages.filter(message => message.user === props.friendName).length > 0  
                        || !props.friendName && props.newMessages && props.newMessages.length
                        ? showStyle : hideStyle}
        >
            <IconButton
                tooltip={props.newMessages && props.newMessages.length ? props.newMessages.length + " new messages" : "No new messages"}
                tooltipPosition="bottom-left"
                style={{ 'color': 'white' }}
            >
                <CommunicationChatBubble />
            </IconButton>
        </Badge>
    </div>
);

const mapStateToProps = state => {
    return {
        newMessages: state.messages,
        chatWindowCount: state.chatWindowCount
    };
}

export default connect(mapStateToProps)(MessagesBadge);