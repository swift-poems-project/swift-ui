import {
    FETCHING_COLLATION,
    RECEIVE_COLLATION
} from '../constants'

export default function collationReducer (state, action) {
    if (typeof state === 'undefined')
	return {}

    switch (action.type) {
    case FETCHING_COLLATION:
	return fetchingCollation(state, action)

    case RECEIVE_COLLATION:
	return receiveCollation(state, action)

    default:
	return state
    }
}

function fetchingCollation (/* state, action */) {
    return {
	isFetching: true,
    }
}

function receiveCollation (state, action) {
    return {
	data: action.data,
	fetchedAt: Date.now(),
	isFetching: false,
	isSaving: false,
	updates: {},
    }

}
