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
      errorMessage: '',
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
            Email addresses must be formatted email1@email.com,
            email2@email.com, email3@email.com...
          </h4>
          <input name="emailVal" type="text"></input>
          {this.state.error ? (
            <h4 className="error">
              {this.state.errorMessage} is not a valid email address
            </h4>
          ) : null}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

        {this.state.isLoaded ? (
          <div>
            <h1>Number of unique email addresses</h1>
            <h1>{this.state.uniqueEmailNum}</h1>
          </div>
        ) : null}
      </div>
    );
  }
  async getUniqueEmails(email) {
    let response = await axios.get(`/${email}`);
    this.setState({
      isLoaded: true,
      uniqueEmailNum: response.data,
    });
  }
  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.emailVal.length) {
      const splitEmails = this.state.emailVal
        .split(',')
        .map((email) => email.trim());
      for (let i = 0; i < splitEmails.length; i++) {
        let email = splitEmails[i];
        if (!this.emailIsValid(email)) {
          this.setState({ error: true, errorMessage: email });
          break;
        }
      }
      if (!this.state.error) {
        this.getUniqueEmails(this.state.emailVal);
      }
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: false,
    });
  }
}

export default App;
