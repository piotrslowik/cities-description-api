import React, { Component } from 'react';
import Axios from 'axios';
import SuggestionsInput from './components/smart/SuggestionsInput';
import Button from './components/shared/Button';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.suggestions = ['Poland', 'Germany', 'Spain', 'France']

    this.state = {
      inputValue: '',
    }
  }

  render() {
    return (
      <div className="App">
        <SuggestionsInput
          inputValue={this.state.inputValue}
          suggestions={this.suggestions}
          actionOnValueChange={this.handleValueChange}
        />
        <Button
          text={'Search'}
          action={this.handleCountrySearch}
        />
      </div>
    )
  }

  handleValueChange = value => {
    this.setState({
      inputValue: value,
    })
  }

  handleCountrySearch = () => {
    console.log(this.state.inputValue)
  }
}

export default App;
