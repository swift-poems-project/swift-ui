import React from 'react'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'

const Collation = React.createClass({
    componentDidMount: function () {
	
      	const id = this.props.params.poemId

	if (!id) {
	    // handle no id
	}

	this.props.fetchVariants(id)
	this.props.router.setRouteLeaveHook(this.props.route, this.onExit)
    },
    
    renderHeader: function () {

	/**
	 * @todo Determine why this isn't being invoked from componentDidMount
	 *
	 */
	/*
      	const id = this.props.params.poemId

	if (!id) {
	    // handle no id
	}
	*/

	console.log(this.props)
	
	const poem = this.props.poem
	let title
	
	if (poem.isFetching || typeof poem.data === 'undefined')
	    title = 'fetching...'
	else
	    title = poem.data.title || poem.data.id
	
	// default to just the first title for now
	if (Array.isArray(title) && title.length > 1)
	    title = title[0]
	
	const debugUrl = `/${this.props.params.poemId}`
	
	return (
		<header>
		<h1 style={{display: 'inline-block'}}>{}</h1>

		<a
	    href={debugUrl}
	    style={{
		fontFamily: 'monospace',
		margin: '0 1em',
	    }}
	    target="_blank"
	    children={'(debug)'}
		/>

	    {this.props.poem.isChanged ? this.showChangedBadge() : ''}
	    </header>
	)
    },
    
    
    render: function () {
	return (
		<div id="tei">
		  {this.renderHeader()}
		</div>
	)
    }
})

export default withRouter(Collation)
