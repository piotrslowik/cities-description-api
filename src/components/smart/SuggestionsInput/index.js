import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

import Input from '../../shared/Input';
import Suggestion from '../../shared/Suggestion';

class SuggestionsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSuggestionIndex: 0,
      filteredSuggestions: [],
      suggestionsNumber: 0,
      willEnterSend: false,
    }
  }

  render() {
    ArrowKeysReact.config({
      up: () => this.handleUpArrowKey(),
      down: () => this.handleDownArrowKey()
    });

    return (
      <div className="suggestions-input" >
        <Input
          value={ this.props.inputValue }
          actionOnChange={ this.handleInput }
          placeholder="Type a name of a country..."
          actionOnKeyPress={ this.handleSpecialKeys }
          arrowEvents={ ArrowKeysReact.events }
          actionOnBlur={ this.toggleSuggestionsVisibility }
          actionOnFocus={ this.toggleSuggestionsVisibility }
        />
        <div className="suggestions-input-list hidden">
          { this.renderSuggestions() }
        </div>
      </div>
    );
  }

  handleInput = value => {
    const filteredSuggestions = this.props.suggestions.filter(el => this.filterSuggestions(el, value));
    this.props.actionOnValueChange(value);
    this.setState({
      filteredSuggestions: filteredSuggestions
    })
  }


  handleSpecialKeys = event => {
    if (event.key === 'Enter') {
      if (!this.state.willEnterSend) {
        const newValue = this.state.filteredSuggestions[this.state.activeSuggestionIndex];
        this.props.actionOnValueChange(newValue);
        this.setState({
          willEnterSend: true,
        });
      } else {
        this.props.actionOnSend();
        this.setState({
          willEnterSend: false,
        });
      }
    } else {
      this.setState({
        willEnterSend: false,
      });
    }
  }

  handleUpArrowKey = () => {
    if (this.state.activeSuggestionIndex >= 1) {
      this.setState(prevState => {
        return {
          activeSuggestionIndex: --prevState.activeSuggestionIndex,
          willEnterSend: false,
        };
      });
    }
  }

  handleDownArrowKey = () => {
    if (this.state.activeSuggestionIndex < this.state.filteredSuggestions.length - 1 ) {
      this.setState(prevState => {
        return {
          activeSuggestionIndex: ++prevState.activeSuggestionIndex,
          willEnterSend: false,
        };
      });
    }
  }

  renderSuggestions = () => {
    return this.props.inputValue === ''
    ? null
    : (this.state.filteredSuggestions.map((el, index) => {
        return (
          <Suggestion
            key={index}
            text={el}
            actionOnClick={this.props.actionOnValueChange}
            active={this.state.activeSuggestionIndex === index}
          />
        )
      })
    )
  }

  filterSuggestions = (value, filterValue) => {
    return value.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
  }

  toggleSuggestionsVisibility = () => {
    setTimeout(() => {
      document.querySelector('.suggestions-input-list').classList.toggle('hidden');
    }, 0);
  }

}

export default SuggestionsInput;
