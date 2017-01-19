import React from 'react'
import Line from './Line.jsx'
import Token from './Token.jsx'

const T = React.PropTypes
const Headnote = React.createClass({

	propTypes: {
		index: T.number.isRequired,
		base: T.object.isRequired,
		variants: T.array.isRequired
	},

	render: function () {
		const baseIndex = this.props.base.index

		return (
			<div>
				<h4>Headnote {this.props.index}</h4>
				<table className="ui celled structured table">
					<caption>Comparison by Line Text</caption>
					<thead>
						<tr>
							<th>ID</th>
							<th>Content</th>
						</tr>
					</thead>
					<tbody>
						<Line key={`headnote-base-line-${this.props.base.index}`} index={this.props.base.index}>{this.props.base.value}</Line>

						{	this.props.variants.map(function(line, variantIndex) {
								return <Line key={`headnote-${variantIndex}-line-${line.index}`} index={line.index}>{line.value}</Line>
							})
						}
					</tbody>
				</table>

				<div className="table-tokens-container">
				<table className="ui celled structured table">
					<caption>Comparison by Line Tokens</caption>
					<tbody>
						<tr>
							<td>{this.props.base.index}</td>
							{ this.props.base.tokens.map(function(token, tokenIndex) {
									return <Token key={`headnote-base-line-${baseIndex}-token-${tokenIndex}`}>{token.value}</Token>
								})
							}
						</tr>
						{	this.props.variants.map(function(line, variantIndex) {
							return <tr key={`headnote-${variantIndex}-line-${line.index}-tokens`}>
								<td>{line.index}</td>
								{ line.tokens.map(function(token, tokenIndex) {
										return <Token key={`headnote-${variantIndex}-line-${line.index}-token-${tokenIndex}`}>{token.value}</Token>
									})
								}
							</tr>
							})
						}
					</tbody>
				</table>
				</div>
			</div>
		)
	}
})

export default Headnote
