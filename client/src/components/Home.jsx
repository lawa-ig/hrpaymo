import React from 'react';
import Navbar from './Navbar.jsx';
import Payment from './Payment.jsx';
import FeedContainer from './FeedContainer.jsx';
import MiniProfile from './MiniProfile.jsx';
import ContactsList from './ContactsList.jsx';
import { connect } from 'react-redux';

const Home = (props) => {

  let extractView = () => {
    let search = props.location && props.location.search;
    return search && search.slice(search.indexOf('=') + 1);
  }

  return (
    <div>
      <Navbar/>
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
            newNotification={props.newNotification}
            uiAvatar={props.userInfo.avatarUrl || '/images/no-image.gif'}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    globalFeed: state.globalFeed,
    userFeed: state.userFeed,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(Home);
