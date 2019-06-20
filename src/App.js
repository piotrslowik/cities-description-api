import React, { Component } from 'react';
import axios from 'axios';
import { CORS } from './helpers';
import SuggestionsInput from './components/smart/SuggestionsInput';
import Button from './components/shared/Button';
import Loading from './components/shared/Loading';
import Header from './components/shared/Header';
import Accordion from './components/shared/Accordion';
import PollutionSelect from './components/smart/PollutionSelect';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.suggestions = ['Poland', 'Germany', 'Spain', 'France']

    this.state = {
      inputValue: '',
      pollutionType: 'BC',
      isLoading: false,
      data: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          main="10 most polluted cities"
          sub="Since 1st of June 2019"
        />
        <PollutionSelect
          actionOnChange={this.handlePollutionTypeChange}
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
      this.state.data.map(el => {
        return (
          <Accordion
            header={ el.cityName }
            text={ el.cityDescription }
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
      })
      const response = await axios.get(`${CORS}https://api.openaq.org/v1/measurements`, {
        params: {
          country: this.getCountryCode(this.state.inputValue),
          parameter: this.state.pollutionType,
          order_by: 'value',
          sort: 'desc',
          date_from: '2019-06-01',
        }
      });
      let cities = this.getCitiesFromResponse(response.data.results);
      cities = this.getUniqes(cities)
      const citiesForAccordion = await this.formatDataForAccordion(cities);
      this.setState({
        data: citiesForAccordion,
        isLoading: false,
      })
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  getWikiAbout = async topic => {
    try {
      // const response = await axios.get(`${CORS}https://en.wikipedia.org/w/api.php`, {
      //   params: {
      //     action: 'query',
      //     prop: 'extracts',
      //     rvprop: 'content',
      //     rvsection: 0,
      //     titles: 'Pizza'
      //   },
      // });
      const data = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`);
      return data.data.extract;
    } catch (error) {
      console.error(error)
    }
  }

  formatDataForAccordion = async city => {
    const output = [];
    for (let i = 0; i < 10; i++) {
      const desc = await this.getWikiAbout(city[i])
      const cityObj = {
        cityName: city[i],
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
      Spain: 'SP',
    }
    return codes[country];
  }

  getCitiesFromResponse = data => {
    return data.reduce((groups, item) => {
      groups.push(item['city'])
      return groups
    }, []);
  }

  getUniqes = arr => {
    const newArr = [];
    arr.forEach(el => {
      if (!newArr.includes(el)) newArr.push(el);
    })
    return newArr
  }
}

export default App;
