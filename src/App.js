import React, { Component } from 'react';
import { MainWeather, OtherDetails, WindDetails, Sun } from './components/weather';
import './App.css';
import axios from 'axios';
import Form from './components/form';
import { dayornight, weatherIcon, getbg } from './functions/functions';




class App extends Component {
  constructor(props) {
    super(props);
    this.API_key = 'eb06bab0e46b55eabeb33e864b04302f';
    this.state = {
      LocationName: 'london, uk',
      id: null,
      main: null,
      description: null,
      icon: null,
      base: null,
      temp: null,
      feels_like: null,
      temp_min: null,
      temp_max: null,
      pressure: null,
      humidity: null,
      visibility: null,
      speed: null,
      deg: null,
      cloudsAll: null,
      country: null,
      sunrise: null,
      sunset: null,
      timezone: null,
      city: null,
      cityId: null,

      // internal varaiables
      error: false,
      inCelsius: true,
      up: "C",
      down: "F",
      dayOrNight: null,
      bg: "clearskyday",
    }


  }

  changeOnClick = () => {
    let up = this.state.up;
    let down = this.state.down;

    let temp = up;
    up = down;
    down = temp;

    this.setState({
      up: up,
      down: down,
      inCelsius: !this.state.inCelsius
    })
  }
  refreshOnClick = (e) => {
    let refresh = e.target;
    refresh.classList.add("rotate");
    new Promise((resolve, reject) => {
      resolve(this.getWeather())

    }).then(() => {
      setTimeout(() => {
        refresh.classList.remove("rotate");
      }, 1000);

    })
  }


  getWetherOnLoad = () => {
    axios.get("https://extreme-ip-lookup.com/json/")
      .then(res => {
        this.setState({
          LocationName: `${res.data.city}, ${res.data.country}`,
        })
        alert('getting data from https://extreme-ip-lookup.com/json/');
      })
      .then(() => {
        this.getWeather();
        alert('calling getWeather in then');
      })
      .catch(() => {
        this.getWeather()
        alert('calling getWeather in catch');
      })

  }
  getWeather = () => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.LocationName}&appid=${this.API_key}`)
      .then((res) => {

        const data = res.data;

        this.setState({
          id: data.weather[0].id,
          main: data.weather[0].main,
          description: (data.weather[0].description),
          base: data.base,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          visibility: data.visibility,
          speed: data.wind.speed,
          deg: data.wind.deg,
          cloudsAll: data.clouds.all,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          city: data.name,
          cityId: data.id,

        })

        return (data);
      }).then((data) => {
        let dOrN = dayornight(data.timezone, data.sys.sunrise, data.sys.sunset);

        this.setState({
          dayOrNight: dOrN
        })
      }).then(() => {
        var icon, bg;
        new Promise((resolve, reject) => {
          icon = weatherIcon(this.state.dayOrNight, this.state.id);
          bg = getbg(this.state.dayOrNight, this.state.id);
          resolve("done");
        }).then(() => {
          this.setState({
            icon: icon,
            bg: bg,
          })

        })

      })

  }

  fetchSearchData = (searchData) => {

    new Promise((resolve) => {

      resolve(

        this.setState({

          LocationName: searchData

        })

      )

    })
      .then(() => {
        this.getWeather();
      })

  }

  componentDidMount() {
    this.getWetherOnLoad();
    this.getWeather();
    alert('componentDidMount');
  }

  render() {
    dayornight(this.state.timezone, this.state.sunrise, this.state.sunset);
    let bg = this.state.bg;
    let styles = {
      bg: {
        width: `100%`,
        height: `100vh`,
        background: `url(bg/${bg}.jpg) center center / cover no-repeat fixed`,
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
      }
    }
    return (
      <div className="wrapper" style={styles.bg}>
        <div className="container">
          <Form fetchSearchData={this.fetchSearchData} />
          <div className="main_view">
            <MainWeather props={this.state} changeOnClick={this.changeOnClick} refreshOnClick={this.refreshOnClick} />
            <OtherDetails props={this.state} />

          </div>
          <div className="main_view">
            <WindDetails props={this.state} />
            <Sun props={this.state} />
          </div>


        </div>
      </div>


    );

  }

}

export default App;


