import {
    ON_MESSAGE_SOCKET,
		OPEN_SOCKET,
		CLOSED_SOCKET
} from '../constants'

function onOpenSocket (state, action) {
	return {
		webSocket: action.socket,
  }
}

function onMessageSocket (state, action) {
	return {
		webSocket: state.webSocket,
		message: JSON.parse(action.data),
  }
}

function onClosedSocket () {
	return {
		webSocket: null,
		message: { status: 'Collation session ended', collation: null }
  }
}

export default function socketReducer (state, action) {
    if (typeof state === 'undefined')
			return {}

    switch (action.type) {
			case OPEN_SOCKET:
				return onOpenSocket(state, action)

			case ON_MESSAGE_SOCKET:
				return onMessageSocket(state, action)

			case CLOSED_SOCKET:
				return onClosedSocket()

    	default:
				return state
    }
}
