import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import navbar from './navbar'
import socket from './socket'
import poem from './poem'
import transcript from './transcript'
import collation from './collation'

const routeReducer = combineReducers({
    navbar,
		socket,
		poem,
		transcript,
    collation,
    routing: routerReducer,
})

export default routeReducer
