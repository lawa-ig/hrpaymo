

export const LOG_USER_OUT = 'LOG_USER_OUT';
export const GET_BALANCE = 'GET_BALANCE';
export const GET_USER_INFO = 'GET_USER_INFO';
export const LOG_IN = 'LOG_IN';
export const PREPEND_FEED = 'PREPEND_FEED';
export const LOAD_MORE_FEED = 'LOAD_MORE_FEED';
export const CHANGE_USERNAMES = 'CHANGE_USERNAMES';
export const CHANGE_PAYEE_USERNAME = 'CHANGE_PAYEE_USERNAME';
export const PAY_USER = 'PAY_USER';
export const NO_PAY_USER = 'NO_PAY_USER';
export const HANDLE_PAYMENT_INPUTS = 'HANDLE_PAYMENT_INPUTS';
export const LOAD_PROFILE_DATA = 'LOAD_PROFILE_DATA';
export const UNKNOWN_USER = 'UNKNOWN_USER';
export const PROFILE_LOAD_MORE_FEED = 'PROFILE_LOAD_MORE_FEED';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const CHANGE_COMMENT = 'CHANGE_COMMENT';
export const CLEAR_USER_MESSAGES = 'CLEAR_USER_MESSAGES';
export const CLEAR_USER_NOTIFICATIONS = 'CLEAR_USER_NOTIFICATIONS';
export const TOGGLE_FRIEND = 'TOGGLE_FRIEND';
export const OPEN_SOCKET = 'OPEN_SOCKET';
export const UPDATE_FRIENDS_ONLINE = 'UPDATE_FRIENDS_ONLINE';

// /*
//  * action creators
//  */


export function actionLogOut() {
    return { type: LOG_USER_OUT }
}

export function actionBalance(request) {
		return { type: GET_BALANCE,
						 payload: request
					 }
}

export function actionUserInfo(request) {
		return {	type: GET_USER_INFO,
							payload: request
						}
}
export function actionLogIn(request) {
	return {
		type: LOG_IN,
		payload: request
	}
}

export function getFriends(request) {
	return {
		type: GET_FRIENDS_LIST,
		payload: request
	}
}

export function actionPrependFeed(request) {
	return {
		type: PREPEND_FEED,
		payload: request
	}
}

export function actionLoadMoreFeed(request) {
	return {
		type: LOAD_MORE_FEED,
		payload: request
	}
}

export function changeUsernames(request) {
	return {
		type: CHANGE_USERNAMES,
		payload: request
	}
}

export function actionProfileLoadMoreFeed(request) {
	return {
		type: PROFILE_LOAD_MORE_FEED,
		payload: request
	}
}


export function actionLoadProfileData(request) {
	return {
		type: LOAD_PROFILE_DATA,
		payload: request
	}
}


export function changePayeeUsername(request) {
	return {
		type: CHANGE_PAYEE_USERNAME,
		payload: request
	}
}

export function payUser() {
	return {
		type: PAY_USER
	}
}

export function noPayUser() {
	return {
		type: NO_PAY_USER
	}
}

export function handlePaymentInputs(obj) {
	return {
		type: HANDLE_PAYMENT_INPUTS,
		payload: obj
	}
}

export function actionUnknownUser() {
		return {
			type: UNKNOWN_USER
		}
}

export function changeComment(request) {
	return {
		type: CHANGE_COMMENT,
		payload: request
	}
}


export function actionClearMessagesForUser() {
	return {
		type: CLEAR_USER_MESSAGES,
	}
}

export function actionClearNotificationsForUser() {
	return {
		type: CLEAR_USER_NOTIFICATIONS,
	}
}

export function actionToggleFriend() {
	return {
		type: TOGGLE_FRIEND
	}
}

export function actionOpenSocket() {
	return {
		type: OPEN_SOCKET
	}
}

export function actionUpdateFriendsOnline() {
	return {
		type: UPDATE_FRIENDS_ONLINE
	}
}
