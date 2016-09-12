import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import addPlus from '../utils/addPlus'

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForecast: false
    }

    this.updateWeatherData = this.updateWeatherData.bind(this)
    this.removeLocation    = this.removeLocation.bind(this)

    if (!this.props.weather) this.updateWeatherData()
  }

  updateWeatherData() {
    this.props.askWeatherData( this.props.id )
  }

  removeLocation() {
    this.props.removeLocation( this.props.id )
  }

  componentWillUnmount() {
    clearInterval(this.weatherTimer)
    if (this.forecastTimer) clearInterval(this.forecastTimer)
  }

  render() {

    let { weather = null } = this.props

    let weatherData
    if (weather) {
      weatherData = 
        <div className="weatherData">
          <span className="left">
            {addPlus(weather.temp)} C <br/>
            {weather.humidity} % <br/>
            {weather.pressure} mm <br/>
          </span>
        </div>
    } else {
      weatherData = <span>Loading...</span>
    }

    const station = weather ? weather.station : null

    return (
      <div className="chunk">
        <b>{this.props.name}</b>
        <button className='close-btn' onClick={this.removeLocation}>Delete location</button><br/>

        <span style={{fontSize: 14}}>
          {(station !== this.props.name) ? station : ''}
        </span>

        {weatherData}

      </div>
    )
  }
}

Location.propTypes = {
  name: PropTypes.string.isRequired
}

export default connect()(Location)