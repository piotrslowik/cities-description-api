import React, { Component } from 'react';
import Input from './components/Input';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    }
  }

  render() {
    return (
      <div className="App">
        <Input
          value={ this.state.inputValue }
          actionOnChange={ this.handleInput }
          placeholder="Type a name of a country..."
          autoComplete="on"
        />
      </div>
    );
  }

  handleInput = value => {
    this.setState({
      inputValue: value
    })
  }
}

export default App;
