import React, { Component } from 'react';
import axios from 'axios';
import { CORS } from '../../../helpers'
import Select from '../../shared/Select';

class PollutionSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      options: [],
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${CORS}https://api.openaq.org/v1/parameters`);
      const fetchedOptions = response.data.results.map(el => {
        return {
          value: el.name,
          text: el.description,
        };
      });
      this.setState({
        isLoading: false,
        options: fetchedOptions,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
        this.state.isLoading
        ? <p className="pollution-select__loading">Loading options...</p>
        : <Select
          label="Type of pollution"
          options={this.state.options}
          actionOnChange={this.props.actionOnChange}
          />
    )
  }
}

export default PollutionSelect;