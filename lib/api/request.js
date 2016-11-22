require('es6-promise').polyfill()

import 'isomorphic-fetch'
import assign from 'object-assign'
import isAbsoluteUrl from 'is-absolute-url'

const API_BASE_URL = process.env.API_BASE_URL

function buildUrl (path) {
	if (isAbsoluteUrl(path))
		return path
	return API_BASE_URL + path
}

export function getTei (path) {
	const uri = buildUrl(path)
	const CETEIcean = new CETEI()

	return CETEIcean.getHTML5(uri, function(data) {
		document.getElementById("tei").innerHTML = ""
		document.getElementById("tei").appendChild(data)
		CETEIcean.addStyle(document, data)
  });
}

function apiRequest (method, path, data, options) {
	const uri = buildUrl(path)

	const defaults = {
		method,
		headers: {
			'Accept': 'application/json',
		}
  }

	if (data) {
		defaults.headers['Content-Type'] = 'application/json'
		defaults.body = JSON.stringify(data)
  }

  const opts = assign({}, defaults, options)

	return fetch(uri, opts)
	.then(handleResponseStatus)
	.then(parseJSON)
	.catch(err => { throw err })
}

// github example:
// https://github.com/github/fetch/blob/master/README.md#handling-http-error-statuses
function handleResponseStatus (response) {
  if (response.status >= 200 && response.status < 300)
		return response

  const err = new Error(response.statusText)
  err.status = response.status
  throw err
}

function parseJSON (response) {
  return response.json()
}

export function del () {
  return apiRequest.bind(null, 'DELETE').apply(null, arguments)
}

export function get () {
  return apiRequest.bind(null, 'GET').apply(null, arguments)
}

export function patch () {
  return apiRequest.bind(null, 'PATCH').apply(null, arguments)
}

export function post () {
  return apiRequest.bind(null, 'POST').apply(null, arguments)
}

export function put () {
  return apiRequest.bind(null, 'PUT').apply(null, arguments)
}
