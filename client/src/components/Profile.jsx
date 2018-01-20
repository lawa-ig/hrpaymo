import React from 'react';
import Navbar from './Navbar.jsx';
import Payment from './Payment.jsx';
import FeedContainer from './FeedContainer.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import { connect } from 'react-redux';
import { actionLoadProfileData,
         actionUnknownUser,
         actionProfileLoadMoreFeed,
         actionPrependFeed } from './Reducers/Actions.js'
import axios from 'axios';
import feedManipulation from '../feedManipulation.js'

class Profile extends React.Component {

  componentDidMount() {
    let profileUsername = this.props.match.params.username;
    let userId = this.props.userInfo.userId;
    this.loadProfileData(profileUsername);
    this.getProfileFeeds('profileFeed', userId, null, profileUsername);
    this.getProfileFeeds('relationalFeed', userId, null, profileUsername);
  }

  getProfileFeeds(feedType, userId = null, sinceId, profileUsername) {
    let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

    let params = {
      sinceId: sinceId,
      userId: userId,
      profileUsername: profileUsername
    }

    axios(endpoint, {params: params})
      .then((response) => {
        this.prependNewTransactions(feedType, response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  prependNewTransactions(feedType, transactionSummary) {
    // If no results return, do nothing
    if (!transactionSummary || transactionSummary.count === 0) {
      return;
    }

    // If feed was empty, set the returned transactions as the feed
    let isFeedEmpty = !this.props[feedType].count || this.props[feedType].count === 0;

    let newFeedObject = isFeedEmpty
      ? transactionSummary
      : feedManipulation.mergeFeeds(transactionSummary, this.props[feedType]);
    this.props.dispatch(actionPrependFeed({ feedType: feedType, obj: newFeedObject}))
  }

  loadMoreFeed(feedType, userId) {
    let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

    // Send along the next valid ID you'd like returned back
    // from the database
    let params = {
      beforeId: this.props[feedType].nextPageTransactionId,
      userId: userId,
      profileUsername: this.props.match.params.username
    }

    axios(endpoint, {params: params})
      .then((response) => {

        // Confirm there additional items to load
        if (response.data && response.data.count > 0) {
          let combinedItems = feedManipulation.mergeFeeds(this.props[feedType], response.data);
          this.props.dispatch(actionProfileLoadMoreFeed({ feedType: feedType, obj: combinedItems }))
        }
      })
      .catch((err) => {
        console.error(err);
      }); 
  }

  loadProfileData(username) {
    axios('/publicprofile', {params: {username: username}})
      .then((response) => {
        this.props.dispatch(actionLoadProfileData(response.data));
      })
      .catch((err) =>{
        this.props.dispatch(actionUnknownUser())
        console.error(err);
      });
  }

  extractView() {
    let search = this.props.location && this.props.location.search;
    return search && search.slice(search.indexOf('=') + 1);
  }

  render() {

    let orderedFeeds = [
      {
        displayLabel: `${this.props.profileInfo.firstName}'s Feed`,
        urlParam: 'all',
        feedType: 'profileFeed',
        data: this.props.profileFeed
      },
      {
        displayLabel: `Between You & ${this.props.profileInfo.firstName}`,
        urlParam: 'mutual',
        feedType: 'relationalFeed',
        data: this.props.relationalFeed
      }
    ];
    
    // For a user's own profile page, only show a single feed 
    if (this.props.userInfo.username === this.props.match.params.username) {
      orderedFeeds = orderedFeeds.slice(0, 1);
      orderedFeeds[0].displayLabel = 'Your Feed';
    }

    return (
      <div>
        <Navbar 
          />
        <div className='body-container'>
          {this.props.unknownUser 
            ? <div>User does not exist</div>
            : <div className='pay-feed-container'>
              <ProfileHeader
                isFriend={this.props.friends.map(friend => friend.username).includes(this.props.profileInfo.username)}
              />
                {this.props.userInfo.username !== this.props.match.params.username
                  ? <Payment />
                  : null
                }
                <FeedContainer       
                  loadMoreFeed={this.loadMoreFeed.bind(this)}
                  base={this.props.match.params.username}
                  view={this.extractView()}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    profileInfo: state.profileInfo,
    unknownUser: state.unknownUser,
    profileFeed: state.profileFeed,
    relationalFeed: state.relationalFeed,
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    globalFeed: state.globalFeed,
    userFeed: state.userFeed,
    socket: state.socket,    
    messages: state.messages,
    notifications: state.notifications,
    loggedInUserId: state.loggedInUserId,
    actionLoadProfileData,
    actionUnknownUser,
    actionProfileLoadMoreFeed,
    actionPrependFeed,
    actionClearMessagesForUser
  };
}

export default connect(mapStateToProps)(Profile);
