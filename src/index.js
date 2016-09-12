import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import fetch from 'whatwg-fetch'

import App from './containers/App'
import configureStore from './store'

let store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)