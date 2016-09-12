import { combineReducers } from 'redux'

import locations from './locations'

const weatherApp = combineReducers({
  locations
})

export default weatherApp