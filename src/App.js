import React, { Component } from "react";

import "./App.css";

import "./sass/app.scss";

import TopSection from "./topSection/topSection";
import BottomSection from "./bottomSection/bottomSection";

import axios from "axios";

const WEATHER_KEY = "05fa14e773434825be0193343191301";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Lisbon",
      numForcastDays: 6,
      isLoading: true,
      date: ""
    };
  }

  updateWeather() {
    const { cityName, numForcastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}  &q=${cityName} &days=${numForcastDays}`;
    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          isLoading: false,
          temp_c: data.current.temp_c,
          isDay: data.current.is_day,
          text: data.current.condition.text,
          iconURL: data.current.condition.icon,
          forecastdays: data.forecast.forecastday,
          windSpeed: data.current.wind_kph,
          windDir: data.current.wind_dir,
          windDirDegrees: data.current.wind_degree,
          precepitmm: data.current.precip_mm,
          humidity: data.current.humidity,
          astroSunrise: data.forecast.forecastday[0].astro.sunrise,
          astroSunset: data.forecast.forecastday[0].astro.sunset,
          astroMoonRise: data.forecast.forecastday[0].astro.moonrise,
          astroMoonSet: data.forecast.forecastday[0].astro.moonset,
          localTime: data.location.localtime
        });
        console.log("My data is", data);
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    // Accepts a Date object or date string that is recognized by the Date.parse() method
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  render() {
    const {
      isLoading,
      cityName,
      temp_c,
      isDay,
      text,
      iconURL,
      forecastdays,
      windSpeed,
      windDir,
      windDirDegrees,
      precepitmm,
      humidity,
      astroSunrise,
      astroSunset,
      astroMoonRise,
      astroMoonSet,
      localTime
    } = this.state;

    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading && (
            <div className="topSection">
              <TopSection
                location={cityName}
                temp_c={temp_c}
                isDay={isDay}
                text={text}
                iconURL={iconURL}
                windSpeed={windSpeed}
                windDir={windDir}
                precepitmm={precepitmm}
                humidity={humidity}
                astroSunrise={astroSunrise}
                astroSunset={astroSunset}
                astroMoonRise={astroMoonRise}
                astroMoonSet={astroMoonSet}
                windDirDegrees={windDirDegrees}
                localTime={localTime}
                eventEmitter={this.props.eventEmitter}
              />
            </div>
          )}
          <div className="bottomSection">
            <BottomSection forecastdays={forecastdays} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
