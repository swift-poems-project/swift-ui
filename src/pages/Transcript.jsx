import React from 'react'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'

const Transcript = React.createClass({
    componentDidMount: function () {
    	const id = this.props.params.id
			if (!id) {
	    	// handle no id
			}

			this.props.fetchTranscript(id)
			this.props.router.setRouteLeaveHook(this.props.route, this.onExit)
    },

    getInitialState: function () {
			return {}
    },

    renderHeader: function () {
			/**
			* @todo Determine why this isn't being invoked from componentDidMount
			*
			*/
			const poem = this.props.poem
			let title

			if (poem.isFetching || typeof poem.data === 'undefined')
	    	title = 'fetching...'
			else
	    	title = poem.data.title || poem.data.id

			// default to just the first title for now
			if (Array.isArray(title) && title.length > 1)
	    	title = title[0]

			return (
				<header>
					<h1 style={{display: 'inline-block'}}>{}</h1>
	    		{this.props.poem.isChanged ? this.showChangedBadge() : ''}
	    	</header>
    )},

    render: function () {
			return (
				<div id="tei">
		  		{this.renderHeader()}
				</div>
			)}
		}
	)

export default withRouter(Transcript)
