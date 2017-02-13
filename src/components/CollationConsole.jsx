import React from 'react'
import assign from 'object-assign'
import Websocket from 'react-websocket'

const T = React.PropTypes
class CollationConsole extends React.Component {

	constructor(props) {
		super(props)
		//const message = JSON.parse(this.props.webSocket.message)
		/*
		this.state = {
			status: message.status
		}
		*/
		this.state = {
			status: this.props.status
		}
	}

	componentWillReceiveProps(nextProps) {
		/*
		if (nextProps.webSocket.message) {
			const message = JSON.parse(nextProps.webSocket.message)
			this.setState({status: message.status})
		} else {
			this.setState({status: "Collation session terminated (please reset)"})
		}
		*/
		this.setState({status: nextProps.status})
	}

	render() {
		return (
			<div>
				<pre>
					{this.state.status}
				</pre>
			</div>
		)
	}
}

CollationConsole.propTypes = {
	webSocket: T.object.isRequired,
}

export default CollationConsole
