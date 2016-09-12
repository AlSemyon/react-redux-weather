import * as Action from '../constants/actionTypes'
import { OWM_URL, OWM_API_KEY, IP_API } from '../constants/APIsData.js'

import fetchData from '../utils/fetchData'

export function addLocation(name, coord = null) {
  return {
    type: Action.ADD_LOCATION,
    name,
    coord
  }
}

export function removeLocation(id) {
  return {
    type: Action.REMOVE_LOCATION,
    id
  }
}

export function askWeatherData(id, isForecast) {
  return function (dispatch, getState) {

    const { locations } = getState()
    const { name, coord = null, timezone = null } = locations[id]

    // Find location by coordinates otherwise by name
    const params = (coord) ? `&lat=${coord.lat}&lon=${coord.lon}` : `&q=${name}`

    let reqestURL = OWM_URL

    reqestURL += 'weather'
    reqestURL += `?${params}&appid=${OWM_API_KEY}&units=metric&cnt=15` 

    return fetchData(reqestURL, (err, response) => {
      if (!err) {
        console.log(response)
        if (response.cod === "404") {
          dispatch(removeLocation(id))
          return
        }
        dispatch(updateWeather(id, response))
      }
    })
  }
}

export function updateWeather(id, res) {
  const weather = {
    temp:     Math.round(res.main.temp),
    humidity: res.main.humidity,
    pressure: Math.round(res.main.pressure * 0.75),
    station:  res.name
  }
  return {
    type: Action.UPDATE_WEATHER,
    weather,
    id
  }
}

export function findUsersLocation() {
  return function (dispatch) {
    return fetchData(IP_API, (err, response) => {
      if (!err) {
        const { city, lat, lon } = response
        dispatch(addLocation(city, {lat, lon}))
      }
    })

  }
}
