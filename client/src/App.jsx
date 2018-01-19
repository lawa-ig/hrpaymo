// ---------- Packages ---------- //
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';

// ---------- React-Redux ---------- //
import { connect } from 'react-redux';
import { actionLogOut,
         actionLogIn,
         actionBalance,
         actionUserInfo,
         actionPrependFeed,
         actionLoadMoreFeed,
         getFriends
          } from './components/Reducers/Actions.js'



// ---------- Material UI ---------- //
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// ---------- Componenents ---------- //
import LoggedOutHome from './components/LoggedOutHome.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import Navbar from './components/Navbar.jsx';
// ---------- Helper ---------- //
import feedManipulation from './feedManipulation.js'

// ---------- Web Socket ---------- //
import io from 'socket.io-client';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3D95CE',
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD:client/src/App.jsx
=======
    this.state = { 
      isLoggedIn: false,
      globalFeed: {},
      userFeed: {},
      balance: null,
      userInfo: {},
      friends: [],
      socket: io(),
      loggedInUserId: null,
      messages: [],
      notifications: []
    }
>>>>>>> chat works final:client/src/index.jsx
  }

  componentWillMount() {
    this.client_id = '636654108787-tpfoiuolsol40okb92hejj1f3912dc7l.apps.googleusercontent.com';
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      // Check if the user already has an active session
      gapi.auth2.init({ client_id: this.client_id })
        .then(googleAuth => {
          if (googleAuth.isSignedIn.get()) {
            let idToken = googleAuth.currentUser.get().getAuthResponse().id_token;
              axios.post('/login', {idToken})
                .then((userId) => {
                  this.logUserIn(userId.data);
                })
                .catch((err) => {
                  alert('Login failed!');
                  console.log('login error', err);
                })
            }
           })
        });
  }

  loadUserData(userId) {
    this.getUserInfo(userId);
    this.getBalance(userId);
    this.getFeed('globalFeed', userId);
    this.getFeed('userFeed', userId);
    this.getFriendsList(userId);
  }

  refreshUserData(userId) {
    this.getBalance(userId);
    this.getFeed('globalFeed', userId, this.props.globalFeed.newestTransactionId || null);
    this.getFeed('userFeed', userId, this.props.userFeed.newestTransactionId || null);
    this.getFriendsList(userId);
  }

  getFeed(feedType, userId = null, sinceId) {
    let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

    let params = {
      sinceId: sinceId,
      userId: userId
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
    this.props.dispatch(actionPrependFeed({ feedType: feedType, obj: newFeedObject }))

  }

  loadMoreFeed(feedType, userId) {
    let endpoint = feedManipulation.returnFeedEndpoint(feedType, userId);

    // Send along the next valid ID you'd like returned back
    // from the database
    let params = {
      beforeId: this.props[feedType].nextPageTransactionId
    }

    axios(endpoint, { params: params })
      .then((response) => {

        // Confirm there additional items to load
        if (response.data && response.data.count > 0) {
          let combinedItems = feedManipulation.mergeFeeds(this.props[feedType], response.data);
          this.props.dispatch(actionLoadMoreFeed({ feedType: feedType, obj: combinedItems }))
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getBalance(userId) {
    axios('/balance', {params: {userId: userId}})
      .then((response) => {
        this.props.dispatch(actionBalance(response.data.amount))
      })
      .catch((err) =>{
        console.error(err);
      });
  }

  getUserInfo(userId) {
    axios('/profile', {params: {userId: userId}})
      .then((response) => {
          this.props.dispatch(actionUserInfo(response.data))
      })
      .catch((err) =>{
        console.error(err);
      });
  }

  getFriendsList(userId) {
    axios('/friends', { params: { userId: userId } })
      .then((response) => {
        this.props.dispatch(getFriends(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  toggleFriend(userId, friendId, isFriend) {
    var method = isFriend ? 'rmFriend' : 'addFriend';
    axios.post('/friends', { method, friendId, userId })
      .then((response) => {
        this.getFriendsList(this.state.loggedInUserId);
      })
      .catch((error) => {
        console.log('error in toggleFriend (index.jsx)')
      });
  }

  //Notiifications
  newNotification(notif) {
    this.setState({
      notifications: [...this.state.notifications, notif]
    });
  }

  newMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  clearMessagesForUser(user) {
    console.log('username is ', user);
    var keepTheseMessages = this.state.messages.filter(msg => {
      return msg.user !== user
    })
    this.setState({
      messages: keepTheseMessages
    })
  }

  logUserIn(userId) {
<<<<<<< HEAD:client/src/App.jsx
     // set the userId in the userInfo object as soon as the user logs in
     var obj = this.props.userInfo;
     obj.userId = userId;
     this.props.dispatch(actionLogIn(obj));
     this.loadUserData(userId);
   }

=======
    // set the userId in the userInfo object as soon as the user logs in
    var obj = this.state.userInfo;
    obj.userId = userId;
    this.setState({
      isLoggedIn: true,
      userInfo: obj,
      loggedInUserId: userId
    })
    this.loadUserData(userId);
  }

  logUserOut() {
    this.setState({
      isLoggedIn: false,
      globalFeed: {},
      userFeed: {},
      balance: null,
      userInfo: {},
      friends: [],
      socket: null
    })
  }
>>>>>>> chat works final:client/src/index.jsx

  render () {
    const HomeWithProps = (props) => {
      return (
        <div>
          {!this.props.isLoggedIn
            ? <LoggedOutHome 
                logUserIn={this.logUserIn.bind(this)}
                {...props}
              />
<<<<<<< HEAD:client/src/App.jsx
            : 
            <Home
              refreshUserData={this.refreshUserData.bind(this)}
              loadMoreFeed={this.loadMoreFeed.bind(this)}
              {...props}
=======
            : <Home
                refreshUserData={this.refreshUserData.bind(this)}
                isLoggedIn={this.state.isLoggedIn} 
                logUserOut={this.logUserOut.bind(this)}
                userFeed={this.state.userFeed} 
                loadMoreFeed={this.loadMoreFeed.bind(this)}
                globalFeed={this.state.globalFeed}
                userInfo={this.state.userInfo}
                balance={this.state.balance}
                friends={this.state.friends}
                socket={this.state.socket}
                newMessage={this.newMessage.bind(this)}
                newNotification={this.newNotification.bind(this)}
                clearMessagesForUser={this.clearMessagesForUser.bind(this)}
                messages={this.state.messages}
                notifications={this.state.notifications}
                {...props}
>>>>>>> chat works final:client/src/index.jsx
              />
          }
        </div>
      );
    };

    const ProfileWithProps = (routeProps) => {
      return (
        <div>
          {!this.props.isLoggedIn 
            ? <LoggedOutHome 
                logUserIn={this.logUserIn.bind(this)}
                {...routeProps}
              />
            : 
            <Profile 
                key={routeProps.location.pathname}
                refreshUserData={this.refreshUserData.bind(this)}
<<<<<<< HEAD:client/src/App.jsx
                {...routeProps}
=======
                isLoggedIn={this.state.isLoggedIn} 
                logUserOut={this.logUserOut.bind(this)}
                userInfo={this.state.userInfo}
                friends={this.state.friends}
                toggleFriend={this.toggleFriend.bind(this)}
                loggedInUserId={this.state.loggedInUserId}
                socket={this.state.socket}
                clearMessagesForUser={this.clearMessagesForUser.bind(this)}
                messages={this.state.messages}
                notifications={this.state.notifications}
                {...routeProps} 
>>>>>>> chat works final:client/src/index.jsx
              />
          }
        </div>
      );
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Switch>
            <Route 
              path="/:username"
              onEnter={ this.requireAuth }
              render={ProfileWithProps}
            />
            <Route 
              path="/" 
              render={HomeWithProps} 
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    userInfo: state.userInfo,
    isLoggedIn: state.isLoggedIn,
    globalFeed: state.globalFeed,
    userFeed: state.userFeed,
    actionLogOut,
    actionLogIn,
    getFriends,
    actionBalance,
    actionUserInfo,
    actionPrependFeed,
    actionLoadMoreFeed
  };
}



export default connect(mapStateToProps)(App);
