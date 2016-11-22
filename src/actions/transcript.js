import {
    FETCHING_POEM,
    FETCHING_POEM_ERROR,
    RECEIVE_POEM,
    POEM_NOT_FOUND_ERROR,
} from '../constants'

import { getTranscript } from '../../lib/api'

export const fetchTranscript = id => (dispatch) => {

    dispatch({
	type: FETCHING_POEM,
	id,
    })

    return getTranscript(id)
	.then(
	    data => {
		dispatch({
		    type: RECEIVE_POEM,
		    data,
		})
	    },
	    error => {
		if (error.status === 404) {
		    dispatch({
			type: POEM_NOT_FOUND_ERROR,
			error,
			id,
		    })

		    return
		}
	        dispatch({
		    type: FETCHING_POEM_ERROR,
		    error,
		    id,
		})
	    }
	)
}
