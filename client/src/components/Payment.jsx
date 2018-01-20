import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import Autosuggest from 'react-autosuggest';


import { connect } from 'react-redux';
import { changeUsernames, changePayeeUsername, payUser, noPayUser, handlePaymentInputs, changeComment } from './Reducers/Actions.js';


const suggestions = ['dog', 'thank you', 'eat', 'hello', 'hot cocoa', 'coffee', 'thanks',
  'puppies',
  'cowfefe',
  'yolo',
  'kitten mitten',
  'get schwifty',
  'cake',
  'hi',
  'for',
  'pay',
  'tacos',
  'burritos',
  'for tacos',
  'for burritos',
  'financial assistance',
  'bus',
  'Paris',
  'concert',
  'Burning Man',
  'beer',
  'rent',
  'phone bill',
  'gossip girl',
  'tasting in Napa',
  'airbnb',
  'fun',
  'tea',
  'high tea',
  'afternoon tea',
  'haters gonna hate',
  'location',
  'tread lightly',
  'zoo tickets',
  'violin',
  'rhinoceros',
  'pandas',
  'salsa lessons',
  'dancing lessons',
  'energy drinks',
  'red bull gives you wings',
  'boss man'
];




const style = {
  form: {
  },
  input: {
    background: '#fff',
    flex: 'auto',
  },
  button: {
    label: {
      color: '#fff',
      position: 'relative'
    },
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 30,
  }
}

class Payment extends React.Component {


  componentDidMount() {
    axios('/usernames', { params: { userId: this.props.userInfo.userId }})
    .then(response => {
      this.props.dispatch(changeUsernames(response.data.usernames));
   
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  handleInputChanges (event) {
    let target = event.target;
    var obj = {
      name: target.name,
      value: target.value
    }
    this.props.dispatch(handlePaymentInputs(obj));
  
  }

  onDropdownInput(searchText) {
    this.props.dispatch(changePayeeUsername(searchText));
  
  }

  addAComment(text) {
    this.props.dispatch(changeComment(text));
  }


  payUser() {
    let payment = {
      payerId: this.props.userInfo.userId,
      payeeUsername: this.props.payeeUsername,
      amount: this.props.amount,
      note: this.props.note
    };
    axios.post('/pay', payment)
      .then((response) => {
      this.props.dispatch(payUser());    
        this.props.refreshUserData(this.props.userInfo.userId);
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error('UNAUTHORIZED:', error.response);
              break;
            case 422:
              console.error('UNPROCESSABLE ENTRY:', error.response);
              break;
            case 400:
              console.error('BAD REQUEST:', error.response);
              break;
          }
        } else {
          console.error('Error in payment component:', error);
        }
        this.props.dispatch(noPayUser());
      })
  }

  render() {
    const inputProps = {
      placeholder: 'for',
      value: this.props.value,
      onChange: this.onChange
    };

    return (
      <Paper className='payment-container' style={style.form}>
        <div className='payment-item-container'>         
              <div className="form-box payment-username">
                <AutoComplete
                  hintText="Enter a username"
                  floatingLabelText="To:"
                  style={style.input}
                  name='payeeUsername'
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.props.usernames || []}
                  maxSearchResults={7}
                  searchText={this.props.payeeUsername}
                  onUpdateInput = {this.onDropdownInput.bind(this)}
                />
              </div>
          <br />
          <div className="form-box payment-amount">
            <TextField
              style={style.input}
              name='amount'
              value={this.props.amount}
              onChange = {this.handleInputChanges.bind(this)}
              hintText="Enter an amount"
              floatingLabelText="$"
            />
          <br />
          </div>
          <div className="form-box payment-note">
            <AutoComplete
              dataSource={suggestions}
              filter={AutoComplete.caseInsensitiveFilter}
              name='note'
              style={style.input}
              value={this.props.note}
              maxSearchResults={5}
              onUpdateInput = {this.addAComment.bind(this)}
              // hintText="for"
              floatingLabelText="Leave a comment"
              fullWidth={true}
              multiLine={true}
            />
          <br />
          </div>
        </div>

        <button className='btn' onClick={this.payUser.bind(this)}>Pay</button>
        {this.props.paymentFail
          ? <label className='error-text'>
              Error in payment processing
            </label>
          : null
        }
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    paymentFail: state.paymentFail,
    usernames: state.usernames,
    note: state.note,
    amount: state.amount,
    userInfo: state.userInfo,
    payeeUsername: state.payeeUsername,
    value: state.value,
    suggestions: state.suggestions,
    changePayeeUsername,
    changeUsernames,
    payUser,
    noPayUser,
    handlePaymentInputs,
    changeComment
  }
}

export default connect(mapStateToProps)(Payment);
