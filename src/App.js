import React, { Component } from 'react';
import axios from 'axios';
import SuggestionsInput from './components/smart/SuggestionsInput';
import Button from './components/shared/Button';
import Loading from './components/shared/Loading';
import Header from './components/shared/Header';
import Accordion from './components/shared/Accordion';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.suggestions = ['Poland', 'Germany', 'Spain', 'France']

    this.state = {
      inputValue: '',
      isLoading: false,
      data: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          main="10 cities most polluted with PM10"
          sub="Since 1st of June 2019"
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
            action={this.handleCountrySearch}
          />
        </div>
        { 
          this.state.isLoading
          ? <Loading />
          : this.renderData()
        }
        <div className="App-results">
          <Accordion
            header="city"
            text="text"
          />
        </div>
      </div>
    )
  }

  renderData = () => {
    this.state.data.map(el => {
      return <p>el.name</p>
    })
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
      const response = await axios.get(`https://api.openaq.org/v1/measurements`, {
        params: {
          country: 'PL',//this.getCountryCode(this.state.inputValue),
          parameter: 'pm10',
          order_by: 'value',
          sort: 'desc',
          date_from: '2019-06-01',
        }
      });
      let cities = this.getCitiesFromResponse(response.data.results);
      cities = this.getUniqes(cities)
      console.log(cities)

    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      })
    }
    }

  getCountryCode  = country => {
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
