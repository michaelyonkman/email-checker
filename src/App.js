import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      emailVal: '',
      isLoaded: false,
      uniqueEmailNum: null,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="logo-text">email checker</h1>
        </div>

        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <h4>
            Email addresses must be formatted: email1@email.com,
            email2@email.com, email3@email.com...
          </h4>
          <input name="emailVal" type="text"></input>
          {/* error handling for invalid email entries */}
          {this.state.error ? (
            <h4 className="error">
              One or more of the email addresses entered are invalid
            </h4>
          ) : null}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {/* conditional rendering of results for valid inputs */}
        {this.state.isLoaded && !this.state.error ? (
          <div className="results">
            <h1>Number of unique email addresses:</h1>
            <h1 className="bigNum">{this.state.uniqueEmailNum}</h1>
          </div>
        ) : null}
      </div>
    );
  }
  // async call to API for email parsing
  async getUniqueEmails(email) {
    let response = await axios.get(`/${email}`);
    this.setState({
      isLoaded: true,
      uniqueEmailNum: response.data,
    });
  }
  //function to determine if email is valid before sending to API
  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.emailVal.length) {
      //splitting and trimming emails for validation
      const splitEmails = this.state.emailVal
        .split(',')
        .map((email) => email.trim());
      //looping through split emails to validate each one
      for (let i = 0; i < splitEmails.length; i++) {
        let email = splitEmails[i];
        //if invalid email is hit, set error and break
        if (!this.emailIsValid(email)) {
          this.setState({
            error: true,
          });
          break;
        }
      }
      //if all emails pass validation, then send to API for parsing
      if (!this.state.error) {
        this.getUniqueEmails(this.state.emailVal);
      }
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isLoaded: false,
      uniqueEmailNum: null,
      error: false,
    });
  }
}

export default App;
