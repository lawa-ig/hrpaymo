import React from 'react';
import Navbar from './Navbar.jsx';
import Payment from './Payment.jsx';
import FeedContainer from './FeedContainer.jsx';
import MiniProfile from './MiniProfile.jsx';
import { connect } from 'react-redux';

const Home = (props) => {

  let extractView = () => {
    let search = props.location && props.location.search;
    return search && search.slice(search.indexOf('=') + 1);
  }

  return (
    <div>
      <Navbar
        socket={props.socket}
        isLoggedIn={props.isLoggedIn}
        logUserOut={props.logUserOut}
        newMessages={props.messages}
      />
      <div className="home">
        <div className="home-leftColumn pay-feed-container">
          <Payment 
            refreshUserData={props.refreshUserData} />
          <FeedContainer
            loadMoreFeed={props.loadMoreFeed}
            view={extractView()}
          />
        </div>
        <div className="home-rightColumn">
          <MiniProfile />
          <ContactsList
            newMessage={props.newMessage}
            newMessages={props.messages}
            newNotification={props.newNotification}
            clearMessagesForUser={props.clearMessagesForUser}
            friends={props.friends}
            uiAvatar={props.userInfo.avatarUrl || '/images/no-image.gif'}
            loggedInUsername={props.userInfo.username}
            socket={props.socket}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    globalFeed: state.globalFeed,
    userFeed: state.userFeed
  }
}

export default connect(mapStateToProps)(Home);
