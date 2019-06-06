import React from "react";

export default class Weather extends React.Component {
  render() {
    const {
      location,
      temp_c,
      isDay,
      text,
      iconURL,
      windSpeed,
      windDir,
      precepitmm,
      humidity,
      astroSunrise,
      astroSunset,
      astroMoonRise,
      astroMoonSet
    } = this.props;

    if ((this.isDay = 0)) {
      this.isDay = "day";
      // console.log(this.isDay);
    } else {
      this.isDay = "nignt";
      // console.log(this.isDay);
    }

    return (
      <div className="weather-container">
        <div className="header">{location}</div>
        <div className="inner-container">
          <div className="image">
            <img src={iconURL} />
          </div>
          <div className="current-weather">{temp_c}°</div>
        </div>
        <div className="footer">{text}</div>
        <div className="header">{this.isDay}</div>
        <div className="header">{windSpeed} Km/h</div>
        <div className="header">Wind Direction</div>
        <div className="header">{windDir}</div>
        <div className="header">{precepitmm} mm Precipitation</div>
        <div className="header">{humidity} % humidity</div>
        <div className="header">{astroSunrise} Sunrise</div>
        <div className="header">{astroSunset} SunSet</div>
        <div className="header">{astroMoonRise} Moon Rise</div>
        <div className="header">{astroMoonSet} Moon Set</div>
        <div className="header">{this.weekday} Weekday</div>
      </div>
    );
  }
}
