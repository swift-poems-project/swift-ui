import React from 'react'
import Title from './Title.jsx'
import Line from './Line.jsx'
import Body from './Body.jsx'
import Headnote from './Headnote.jsx'
import Footnote from './Footnote.jsx'

const T = React.PropTypes
const Collation = React.createClass({

	propTypes: {
		titles: T.array.isRequired,
		headnotes: T.array.isRequired,
		body: T.array.isRequired,
		footnotes: T.array.isRequired
	},

	render: function () {

		return (
			<div>
				<h2 className="ui huge header">Collation</h2>

				<h3 className="ui large header">Titles</h3>
				{	this.props.titles.map(function(title, titleIndex) {
						return <Title key={`title-${titleIndex + 1}`} index={titleIndex + 1} base={title.base_line} variants={title.variant_lines} />
					})
				}

				<h3 className="ui large header">Headnotes</h3>
				{	this.props.headnotes.map(function(headnote, headnoteIndex) {
						return <Headnote key={`headnote-${headnoteIndex + 1}`} index={headnoteIndex + 1} base={headnote.base_line} variants={headnote.variant_lines} />
					})
				}

				<h3 className="ui large header">Body</h3>
				{	this.props.body.map(function(line, lineIndex) {
						return <Body key={`line-${lineIndex + 1}`} index={lineIndex + 1} base={line.base_line} variants={line.variant_lines}  />
					})
				}

				<h3 className="ui large header">Footnotes</h3>
				{	this.props.footnotes.map(function(footnote, footnoteIndex) {

						return Object.keys(footnote).map(function(footnoteKey) {

							return <Footnote key={`footnote-${footnoteKey + 1}`} index={footnoteIndex + 1} base={footnote[footnoteKey].base_line} variants={footnote[footnoteKey].variant_lines} />
						})
					})
				}
			</div>
		)
	}
})

export default Collation
