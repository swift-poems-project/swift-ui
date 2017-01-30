import {
    FETCHING_COLLATION,
    RECEIVE_COLLATION,
		FETCHING_COLLATION_ERROR,
		RESET_COLLATION
} from '../constants'

export default function collationReducer (state, action) {
    if (typeof state === 'undefined')
			return {}

    switch (action.type) {
    	case FETCHING_COLLATION:
				return fetchingCollation(state, action)

			case RECEIVE_COLLATION:
				return receiveCollation(state, action)

			case FETCHING_COLLATION_ERROR:
				return fetchingCollationError(state, action)

			case RESET_COLLATION:
				return resetCollation(state, action)

    	default:
				return state
    }
}

function resetCollation () {
	return {
		isFetching: false
	}
}

function fetchingCollation () {
	return {
		isFetching: true,
  }
}

function receiveCollation (state, action) {
  return {
		data: action.data,
		fetchedAt: Date.now(),
		isFetching: false
  }
}

function fetchingCollationError (state, action) {
	return {
		isFetching: false,
		error: action.error,
  }
}
