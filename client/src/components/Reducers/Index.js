import { combineReducers } from 'redux';
import io from 'socket.io-client';
import { LOG_USER_OUT, 
         GET_BALANCE,
         GET_USER_INFO,
         LOG_IN,
         GET_FRIENDS_LIST,
         CHANGE_USERNAMES,
         PREPEND_FEED,
         CHANGE_PAYEE_USERNAME,
         PAY_USER,
         NO_PAY_USER,
         HANDLE_PAYMENT_INPUTS,
         LOAD_MORE_FEED,
         LOAD_PROFILE_DATA,
         UNKNOWN_USER,
<<<<<<< HEAD
         CHANGE_VALUE,
         FETCH_SUGGESTIONS,
         PROFILE_LOAD_MORE_FEED,
         CHANGE_COMMENT
                } from './Actions.js';
=======
         PROFILE_LOAD_MORE_FEED,
         CLEAR_USER_MESSAGES,
         CLEAR_USER_NOTIFICATIONS,
         TOGGLE_FRIEND,
         OPEN_SOCKET,
         UPDATE_FRIENDS_ONLINE
                } from './Actions';
>>>>>>> integration in progress

const initialState = {
    isLoggedIn: false,
    globalFeed: {},
    userFeed: {},
    balance: null,
    userInfo: {},
    friends: [],
    payeeUsername: '',
    amount: '',
    note: '',
    paymentFail: false,
    usernames: [],
    profileInfo: {},
    unknownUser: false,
    profileFeed: {},
    relationalFeed: {},
<<<<<<< HEAD
    value: '',
    suggestions: []
=======
    socket: null,
    loggedInUserId: null,
    messages: [],
    notifications: [],
    friendsOnline: []
>>>>>>> integration in progress
}

function paymo(state = initialState, action) {
    // console.log('paymo reducer was called with state', state, 'and action', action)
    switch (action.type) {
        case LOG_USER_OUT:
            return Object.assign({}, state, {
                isLoggedIn: false,
                globalFeed: {},
                userFeed: {},
                balance: null,
                userInfo: {},
                friends: [],
                socket: null
            })
        case GET_BALANCE:
            return Object.assign({}, state, { 
                balance: action.payload
            })
        case GET_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.payload
            })
        case LOG_IN: 
           return Object.assign({}, state, {
               isLoggedIn: true,
               Id: action.payload.userId,
               userInfo: action.payload
           })
        case GET_FRIENDS_LIST: 
            return Object.assign({}, state, {
                friends: action.payload
            });
        case PREPEND_FEED:
            return Object.assign({}, state, {
                [action.payload.feedType]: action.payload.obj
            })
        case LOAD_MORE_FEED:
            return Object.assign({}, state, {
                [action.payload.feedType]: action.payload.obj
            })
        case CHANGE_USERNAMES: 
          return Object.assign({}, state, {
              usernames: action.payload
          })
        case CHANGE_PAYEE_USERNAME: 
          return Object.assign({}, state, {
              payeeUsername: action.payload
          })
        case PAY_USER: 
          return Object.assign({}, state, {
              payeeUsername: '',
              amount: '',
              note: '',
              paymentFail: false
          })
        case NO_PAY_USER: 
          return Object.assign({}, state, {
              paymentFail: true
          })
        case HANDLE_PAYMENT_INPUTS: 
          return Object.assign({}, state, {
              [action.payload.name]: action.payload.value
          })
        case PROFILE_LOAD_MORE_FEED:
            return Object.assign({}, state, {
                [action.payload.feedType]: action.payload.obj
            })
        case LOAD_PROFILE_DATA:
            return Object.assign({}, state, {    
                profileInfo: action.payload
            })
        case UNKNOWN_USER:
            return Object.assign({}, state, {
                unknownUser: true
            })
<<<<<<< HEAD
        case CHANGE_COMMENT: 
            return Object.assign({}, state, {
                note: action.payload
=======
        case CLEAR_USER_MESSAGES:
            return Object.assign({}, state, {
                messages: action.payload.keepTheseMessages
            })
        case CLEAR_USER_NOTIFICATIONS: 
            return Object.assign({}, state, {
                notifications: []
            })
        // case TOGGLE_FRIEND:
        //     return Object.assign({}, state, {

        //     })
        case OPEN_SOCKET:
            return Object.assign({}, state, {
                socket: io()
            })
        case UPDATE_FRIENDS_ONLINE:
            return Object.assign({}, state, {
                friendsOnline: action.payload.friendsOnline
>>>>>>> integration in progress
            })
        default:
            return state
    }
}

export default paymo