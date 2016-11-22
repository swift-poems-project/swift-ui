import React from 'react'
import { Link, browserHistory } from 'react-router'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'
import Autosuggest from 'react-autosuggest'
import theme from '../../build/style.css'

const T = React.PropTypes

let languages = []

const asyncRequest = new Promise(function(resolve, reject) {
	// Standard XHR to load an image
	var request = new XMLHttpRequest();
	request.open('GET', "/api/suggest/poems");
	//request.responseType = 'blob';
	// When the request loads, check whether it was successful
	request.onload = function() {
		if (request.status === 200) {
		// If successful, resolve the promise by passing back the request response
			resolve(request.response);
		} else {
		// If it fails, reject the promise with a error message
			reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
		}
	};
	request.onerror = function() {
	// Also deal with the case when the entire request fails to begin with
	// This is probably a network error, so reject the promise with an appropriate message
			reject(Error('There was a network error.'));
	};
	// Send the request
	request.send();
});

asyncRequest.then(function(response) {
	const data = JSON.parse(response)
	languages = data.items
}, function(Error) {
	console.log(Error)
});

const Navbar = React.createClass({
	getInitialState: function () {
		return {
			value: '',
    	suggestions: []
		};
 	},
	onChange: function (event, { newValue }) {
    this.setState({
      value: newValue
    })
	},
	onSuggestionsFetchRequested: function ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  },
  onSuggestionsClearRequested: function () {
    this.setState({
      suggestions: []
    });
  },
	getSuggestions: function (value) {
		//this.props.fetchSuggestedPoems(value)
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

	  return inputLength === 0 ? [] : languages.filter(poem =>
	    poem.toLowerCase().slice(0, inputLength) === inputValue
	  );
	},
	getSuggestionValue: suggestion => suggestion,
	renderSuggestion: suggestion => (
	  <a href={`/poems/${suggestion}`}>{suggestion}</a>
	),/*<Link to={`/poems/${suggestion}`}>{suggestion}</Link>*/
	render: function () {
			const { value, suggestions } = this.state;
			const inputProps = {
				value: value,
				onChange: this.onChange,
				type: 'search',
				placeholder: 'Browse by Poem ID',
			};

      return (
				<div id="autosuggest-poems" className="container-fluid">
						<Autosuggest
								suggestions={suggestions}
								onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
								onSuggestionsClearRequested={this.onSuggestionsClearRequested}
								getSuggestionValue={this.getSuggestionValue}
								renderSuggestion={this.renderSuggestion}
								inputProps={inputProps}
								theme={theme}
								/>
				</div>
			)}
		})

export default withRouter(Navbar)
