import React from 'react'

const Token = React.createClass({

	render: function () {
		return (
			<td>
				{this.props.children}
			</td>
		)
	}
})

export default Token
