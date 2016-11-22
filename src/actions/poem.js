import {
    FETCHING_POEM,
    FETCHING_POEM_ERROR,
    RECEIVE_POEM,
    POEM_NOT_FOUND_ERROR,
} from '../constants'

import { getPoem, suggestPoems, collate } from '../../lib/api'

export const fetchPoem = id => (dispatch) => {
    dispatch({
			type: FETCHING_POEM,
			id,
    })

    return getPoem(id)
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
		)}

export const fetchSuggestedPoems = query => (dispatch) => {
    dispatch({
			type: FETCHING_POEM,
			query,
    })

    return suggestPoems(query)
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
						query,
		    	})

		    	return
				}

	    	dispatch({
		    	type: FETCHING_POEM_ERROR,
		    	error,
		    	query,
				})
	    }
	)}

	export const fetchCollation = params => (dispatch) => {
	    dispatch({
				type: FETCHING_POEM,
				params
	    })

	    return collate(params)
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
							params,
			    	})

			    	return
					}

		    	dispatch({
			    	type: FETCHING_POEM_ERROR,
			    	error,
			    	params,
					})
		    }
		)}
