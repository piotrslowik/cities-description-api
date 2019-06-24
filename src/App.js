import React, { Component } from 'react';
import axios from 'axios';
import { getUniqes, validateDate } from './helpers';
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
      inputValue: sessionStorage.getItem('inputValue') || '',
      pollutionType: 'bc',
      date: '',
      isLoading: false,
      isError: false,
      noData: false,
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
            actionOnSend={this.handleCountrySearch}
          />
          <Button
            className="App-input__button"
            text={'Search'}
            action={this.handleCountrySearch}
          />
        </div>
        <div className="App-results">
          { 
            this.state.isError
            ? <p className="App-results__error">Sorry, something went wrong... :(</p>
            : null
          }
          { 
            this.state.noData
            ? <p className="App-results__error">Sorry, there is no data about that time or pollution... :(</p>
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
    sessionStorage.setItem('inputValue', value);
    this.setState({
      inputValue: value,
    })
  }

  handleCountrySearch = async () => {
    try {
      this.setState({
        isLoading: true,
        isError: false,
        noData: false,
      })
      const response = await axios.get(`https://api.openaq.org/v1/measurements`, {
        params: {
          country: this.getCountryCode(this.state.inputValue),
          parameter: this.state.pollutionType,
          order_by: 'value',
          sort: 'desc',
          date_from: validateDate(this.state.date),
        }
      });
      let cities = this.getCitiesFromResponse(response.data.results);
      if  (cities.length) {
        this.handleResponse(cities);
      } else {
        this.setState({
          noData: true,
        });
      }
    } catch (error) {
      this.setState({
        isError: true,
      });
     } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleResponse = async data => {
    const cities = getUniqes(data)
    const citiesForAccordion = await this.formatDataForAccordion(cities);
    this.setState({
      data: citiesForAccordion,
    })
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
