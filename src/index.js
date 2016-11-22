/* eslint-disable no-unused-vars */

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import Redirect from 'react-router/lib/Redirect'

import store, { history } from './store'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Transcript from './pages/Transcript.jsx'
import Poem from './pages/Poem.jsx'
import Collation from './pages/Collation.jsx'

const Swift = (
	<Provider store={store}>
	  <Router history={history}>
	    <Route path="/" component={App}>
	       <IndexRoute component={Home} />
	       <Route path="transcripts/:id" component={Transcript} />
	       <Route path="poems/:id" component={Poem} />
				 <Route path="collate" component={Collation} />
	    </Route>
	  </Router>
	</Provider>
)

render(Swift, document.querySelector('#app'))
