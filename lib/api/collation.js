import { post } from './request'

import {
    COLLATION_PATH
} from './constants'

export function collate (params) {
	return post(`/${COLLATION_PATH}`, params)
}
