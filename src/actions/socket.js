
import {
    CONNECTING_SOCKET,
    OPEN_SOCKET,
    CONNECTING_SOCKET_ERROR,
		CLOSING_SOCKET,
		CLOSED_SOCKET,
		CLOSING_SOCKET_ERROR,
		ON_MESSAGE_SOCKET
} from '../constants'

export const connectSocket = (url) => (dispatch) => {
	dispatch({
		type:	CONNECTING_SOCKET,
		url,
  })

	try {
		const socket = new WebSocket(url)
		socket.addEventListener('message', (event) => {
			dispatch({
				type: ON_MESSAGE_SOCKET,
				data: event.data
			})
		})
		socket.addEventListener('close', (event) => {
			console.warn('Collation session ended')

			dispatch({
				type: CLOSED_SOCKET
			})
		})

		return dispatch({
			type: OPEN_SOCKET,
			socket
		})
	} catch(error) {
		return dispatch({
			type: CONNECTING_SOCKET_ERROR,
			error
		})
	}
}

/*
export const sendSocket = (socket, data) => (dispatch) => {
	try {
		const socket = new WebSocket(url)
		return dispatch({
			type: OPEN_SOCKET,
			socket
		})
	} catch(error) {
		return dispatch({
			type: CONNECTING_SOCKET_ERROR,
			error
		})
	}
}
*/

export const closeSocket = (socket) => (dispatch) => {
	dispatch({
		type:	CLOSING_SOCKET,
		socket,
  })

	try {
		socket.close()
		/*
		return dispatch({
			type: CLOSED_SOCKET
		})
		*/
	} catch(error) {
		return dispatch({
			type: CLOSING_SOCKET_ERROR,
			error
		})
	}
}

/*
export const reconnectSocket = (socket) => (dispatch) => {
	closeSocket(socket)
	connectSocket(socket.url)
}
*/
