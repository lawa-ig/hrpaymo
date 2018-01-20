import React from 'react';
import Navbar from './Navbar.jsx';
import Payment from './Payment.jsx';
import FeedContainer from './FeedContainer.jsx';
import MiniProfile from './MiniProfile.jsx';
import { PText } from "react-predictive-text"
import { connect } from 'react-redux';

const Home = (props) => {

  let extractView = () => {
    let search = props.location && props.location.search;
    return search && search.slice(search.indexOf('=') + 1);
  }

  return (
    <div>
      <Navbar />
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
          {/* <ContactsList 
            friends={props.friends}
            uiAvatar={props.userInfo.avatarUrl || '/images/no-image.gif'}
          /> */}
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
