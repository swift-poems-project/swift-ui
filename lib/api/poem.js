import { get, getTei } from './request'

import {
    JSON_EXTENSION,
    TRANSCRIPT_PATH,
		POEMS_PATH,
		SUGGEST_POEMS_PATH
} from './constants'

function buildPoemPath (id) {
    return `/${POEMS_PATH}/${id}`
}
function buildTranscriptPath (id) {
    return `/${TRANSCRIPT_PATH}/${id}`
}
function buildSuggestPoemsPath (query) {
    return `/${SUGGEST_POEMS_PATH}/${query}`
}

export function getPoem (id) {
    const path = buildPoemPath(id)
    return get(path)
}
export function suggestPoems (query) {
    const path = buildSuggestPoemsPath(query)
    return get(path)
}
export function getTranscript (id) {
    const path = buildTranscriptPath(id)
    return getTei(path)
}
