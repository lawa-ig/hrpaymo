import React from 'react';
import { withRouter, Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import NotificationBadge from './NotificationBadge.jsx';
import MessagesBadge from './MessagesBadge.jsx';

import { connect } from 'react-redux';
import { actionLogOut } from './Reducers/Actions.js';

const style = {
  nav: { background: '#3D95CE', display: 'flex' },
  left: { display: 'none' },
  log_out: { color: '#fff', textDecoration: 'underline' }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  logUserOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.props.dispatch(actionLogOut());
    })
  }

  render() {
  return (
    <AppBar 
      className='navbar'
      style={style.nav}
      title={
        <div className='navbar-logo'>
          <Link to="/"><span>Paywaal</span></Link>
        </div>
      }
      iconStyleLeft={style.left}
      iconElementRight={
        <div>
          {
            this.props.isLoggedIn &&
            <div>
            <NotificationBadge
              className="notification-badge"
            />

            <MessagesBadge
              newMessages={this.props.newMessages}
            />

            <FlatButton
              style={style.log_out}
              hoverColor='#03A9F4'
              className='navbar-logout'
              onClick={this.logUserOut.bind(this)}
              label="Log Out"
            />
            </div>
          }
        </div>
      }
    />
  );
  }
}

function mapStateToProps(state) {

  return {
    isLoggedIn: state.isLoggedIn,
    globalFeed: state.globalFeed,
    balance: state.balance,
    userInfo: state.userInfo,
    userFeed: state.userFeed,
    actionLogOut
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));