import React from 'react'
import assign from 'object-assign'
import { NotificationStack } from 'react-notification'
import Navbar from '../components/Navbar.jsx'
import Content from '../components/Content.jsx'

const Main = React.createClass({
	render: function () {
	return (
		<div>
			<Navbar />
		  <section id="content" className="container-fluid">
				{ React.Children.map(this.props.children, c => {
		    	const props = assign({}, this.props, c.props)
		    	return React.cloneElement(c, props, c.props.children)
					})
				}
	    </section>
		</div>
	)}
})

export default Main
