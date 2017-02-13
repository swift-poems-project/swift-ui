import { post } from './request'

import {
    COLLATION_PATH
} from './constants'

export function collate (socket, params) {
	//return post(`/${COLLATION_PATH}`, params)
	socket.send( JSON.stringify(params) )
}
