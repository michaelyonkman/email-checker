import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      emailVal: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className="App">
        <h1>E-mail Checker</h1>
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <input name="emailVal" type="text"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  async getUniqueEmails(email) {
    let response = await axios.get(`/${email}`);
    console.log(response.data);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.getUniqueEmails(this.state.emailVal);
  }
  handleChange(event) {
    console.log(this.state.emailVal);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
}

export default App;
