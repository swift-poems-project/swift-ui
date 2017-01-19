import React from 'react'
import Token from './Token.jsx'

const Line = React.createClass({

	render: function () {

		return (
			<tr>
				<td>
					{this.props.index}
				</td>
				<td>
					{this.props.children}
				</td>
			</tr>
		)
	}
})

export default Line
