'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const initialState = {
		socket: {},
		transcript: {},
		collation: {},
		poem: {},
    routing: {}
}

const middlewares = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    compose(
			applyMiddleware(...middlewares),
			window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

// set up module hot-loading
if (module.hot) {
    module.hot.accept('../reducers/', () => {
			const nextRootReducer = require('../reducers').default
			store.replaceReducer(nextRootReducer)
    })
}

export default store

export const history = syncHistoryWithStore(browserHistory, store)
