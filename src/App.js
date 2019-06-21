import React, { Component } from 'react';
import axios from 'axios';
import { CORS, getUniqes } from './helpers';
import SuggestionsInput from './components/smart/SuggestionsInput';
import Button from './components/shared/Button';
import Loading from './components/shared/Loading';
import Header from './components/shared/Header';
import Accordion from './components/shared/Accordion';
import PollutionSelect from './components/smart/PollutionSelect';
import Date from './components/shared/Date';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.suggestions = ['Poland', 'Germany', 'Spain', 'France']

    this.state = {
      inputValue: '',
      pollutionType: 'bc',
      date: '',
      isLoading: false,
      isError: false,
      data: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          main="10 most polluted cities"
          sub="And their brief description"
        />
        <PollutionSelect
          actionOnChange={this.handlePollutionTypeChange}
        />
        <Date
          actionOnChange={this.handleDateChange}
          value={this.state.date}
          label="Approximate date"
        />
        <div className="App-input">
          <SuggestionsInput
            inputValue={this.state.inputValue}
            suggestions={this.suggestions}
            actionOnValueChange={this.handleValueChange}
          />
          <Button
            className="App-input__button"
            text={'Search'}
            action={()=>this.handleCountrySearch()}
          />
        </div>
        <div className="App-results">
        { 
            this.state.isError
            ? <p className="App-results__error">Sorry, something went wrong... :(</p>
            : null
          }
          { 
            this.state.isLoading
            ? <Loading />
            : this.renderData()
          }
        </div>
      </div>
    )
  }

  renderData = () => {
    return (
      this.state.data.map((el, index) => {
        return (
          <Accordion
            header={ el.cityName }
            text={ el.cityDescription }
            key={ index }
          />
        )
      })
    )
  }

  handleValueChange = value => {
    this.setState({
      inputValue: value,
    })
  }

  handleCountrySearch = async () => {
    try {
      this.setState({
        isLoading: true,
        isError: false,
      })
      const response = await axios.get(`${CORS}https://api.openaq.org/v1/measurements`, {
        params: {
          country: this.getCountryCode(this.state.inputValue),
          parameter: this.state.pollutionType,
          order_by: 'value',
          sort: 'desc',
          date_from: this.state.date,
        }
      });
      console.log(response)
      let cities = this.getCitiesFromResponse(response.data.results);
      cities = getUniqes(cities)
      const citiesForAccordion = await this.formatDataForAccordion(cities);
      this.setState({
        data: citiesForAccordion,
      })
    } catch (error) {
      this.setState({
        isError: true,
      })
     } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  getWikiAbout = async topic => {
    try {
      const data = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`);
      return data.data.extract;
    } catch (error) {
      this.setState({
        isError: true,
      })
    }
  }

  formatDataForAccordion = async cities => {
    const output = [];
    for (let i = 0; i < 10 && i < cities.length; i++) {
      const desc = await this.getWikiAbout(cities[i])
      const cityObj = {
        cityName: cities[i],
        cityDescription: desc,
      };
      output.push(cityObj);
    }
    return output;
  }

  handlePollutionTypeChange = e => {
    this.setState({
      pollutionType: e.target.value,
    })
  }

  getCountryCode = country => {
    const codes = {
      Germany: 'DE',
      France: 'FR',
      Poland: 'PL',
      Spain: 'ES',
    }
    return codes[country];
  }

  getCitiesFromResponse = data => {
    return data.reduce((groups, item) => {
      groups.push(item['city'])
      return groups
    }, []);
  }

  handleDateChange = e => {
    this.setState({
      date: e,
    })
  }
}

export default App;
