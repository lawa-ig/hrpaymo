import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { connect } from 'react-redux';

var newNotifs = 0;

var showStyle = {
    top: 12, 
    right: 12
}

var hideStyle = {
    display: 'none'
}

const NotificationBadge = () => (
    
    <div className="notification-div">
        <Badge
            badgeContent={newNotifs}
            secondary={true}
            badgeStyle={newNotifs ? showStyle : hideStyle}
        >
            <IconButton 
                tooltip={newNotifs? "New Notifications": "No new notifications"}
                tooltipPosition="bottom-left"
                style={{'color': 'white'}}    
            >
                <NotificationsIcon />
            </IconButton>
        </Badge>
    </div>
);

const mapStateToProps = state => {
    return {
        socket: state.socket,
        notifications: state.notifications,
        loggedInUserId: state.loggedInUserId,
    };
}

export default connect(mapStateToProps)(NotificationBadge);
