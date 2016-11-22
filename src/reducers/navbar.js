import {
    FETCHING_POEM,
    RECEIVE_POEM
} from '../constants'

export default function navbarReducer (state, action) {
	if (typeof state === 'undefined')
		return {}

  switch (action.type) {
    case FETCHING_POEM:
			return fetchingPoem(state, action)
    case RECEIVE_POEM:
			return receivePoem(state, action)
  	default:
			return state
  }
}

function fetchingPoem (/* state, action */) {
    return {
			isFetching: true,
    }
}

function receivePoem (state, action) {
  return {
		data: action.data,
		fetchedAt: Date.now(),
		isFetching: false,
		isSaving: false,
		updates: {},
  }
}
