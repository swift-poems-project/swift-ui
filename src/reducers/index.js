import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import poem from './poem'
import navbar from './navbar'
import transcript from './transcript'
import collation from './collation'

const routeReducer = combineReducers({
    navbar,
		poem,
		transcript,
    collation,
    routing: routerReducer,
})

export default routeReducer
