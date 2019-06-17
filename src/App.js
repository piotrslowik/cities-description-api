import React, { Component } from 'react';
import SuggestionsInput from './components/smart/SuggestionsInput';
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
        <SuggestionsInput suggestions={this.suggestions} />
      </div>
    )
  }
}

export default App;
