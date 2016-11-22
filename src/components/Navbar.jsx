import React from 'react'
import { Link, browserHistory } from 'react-router'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'
import Autosuggest from 'react-autosuggest'

const T = React.PropTypes

let languages = []

const asyncRequest = new Promise(function(resolve, reject) {

	var request = new XMLHttpRequest();

	request.open('GET', `${process.env.API_BASE_URL}/suggest/poems`);

	request.onload = function() {
		if (request.status === 200) {
			resolve(request.response)
		} else {
			reject(Error(request.statusText))
		}
	};

	request.onerror = function() {
		reject(Error('There was a network error.'))
	};

	request.send()
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
	onChange: function (event, { newValue, method }) {
    this.setState({
      value: newValue
    })
	},
	onBlur: function (event, { focusedSuggestion }) {
		if (focusedSuggestion != null && typeof(focusedSuggestion) != 'undefined') {
			browserHistory.push(`/poems/${focusedSuggestion}`)
		}
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
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

	  return inputLength === 0 ? [] : languages.filter(poem =>
	    poem.toLowerCase().slice(0, inputLength) === inputValue
	  );
	},

	onSuggestionSelected: function (event, { suggestion, suggestionValue, sectionIndex, method }) {
		switch (method) {
			case 'click':
			case 'enter':
				//browserHistory.push(`/poems/${suggestionValue}`)
				window.location.assign(`/poems/${suggestionValue}`)
		}
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
				onBlur: this.onBlur,
				type: 'search',
				placeholder: 'Browse by Poem ID',
			};

      return (
				<div id="autosuggest-poems" className="container-fluid">
						<Autosuggest
								suggestions={suggestions}
								onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
								onSuggestionsClearRequested={this.onSuggestionsClearRequested}
								onSuggestionSelected={this.onSuggestionSelected}
								getSuggestionValue={this.getSuggestionValue}
								renderSuggestion={this.renderSuggestion}
								inputProps={inputProps}
								/>
				</div>
			)}
		})

export default withRouter(Navbar)
