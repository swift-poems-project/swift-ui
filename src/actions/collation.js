import {
		FETCHING_COLLATION,
    FETCHING_COLLATION_ERROR,
    RECEIVE_COLLATION,
		RESET_COLLATION
} from '../constants'

import { collate } from '../../lib/api'

export const fetchCollation = params => (dispatch) => {

	dispatch({
		type: FETCHING_COLLATION,
		params
	})

	return collate(params)
		.then(
			data => {
				dispatch({
			  	type: RECEIVE_COLLATION,
			    data,
				})
		  },
		  error => {
		  	dispatch({
			  	type: FETCHING_COLLATION_ERROR,
			    error,
			    params,
				})
		  }
)}

export const resetCollation = () => (dispatch) => {

	dispatch({
		type: RESET_COLLATION
	})
}
