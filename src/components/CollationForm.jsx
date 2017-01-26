import React from 'react'
import assign from 'object-assign'
import CollationFormRow from './CollationFormRow.jsx'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const T = React.PropTypes

const CollationForm = React.createClass({

	propTypes: {
		poemId: T.string.isRequired,
		transcripts: T.array.isRequired
	},

	getInitialState: function () {
		let baseText = null
		if ( this.props.transcripts ) {
			const transcript = this.props.transcripts[0]
			baseText = transcript['id'] ? transcript.id : null
		}

		return {
			baseText: baseText,
			variantTexts: this.props.transcripts.map(transcript => transcript.id),
			transcripts: this.props.transcripts
		}
	},

	handleDragAndDrop: function (dragIndex, hoverIndex) {
		const reorderedTranscripts = this.state.transcripts.slice()
		const dragText = transcripts[dragIndex]

		this.setState({transcripts: reorderedTranscripts})
	},

	/**
	 * Handle the submission for the Poem collation form
	 *
	 */
	handleSubmit: function (event) {
		event.preventDefault()

		this.props.fetchCollation({
			poemId: this.props.poemId,
			baseText: this.state.baseText,
			variantTexts: this.state.variantTexts
		})
	},

	clearTexts: function() {
		this.setState({variantTexts: [], baseText: null})
	},

	addOrRemoveVariantText: function (variantText) {
		let updatedVariantTexts = this.state.variantTexts.slice()

		if (this.state.variantTexts.indexOf(variantText) == -1) {
			updatedVariantTexts.push(variantText)
		} else {
			updatedVariantTexts = updatedVariantTexts.filter(e => e != variantText)
		}

		// Refactor
		if (updatedVariantTexts.length == 0) {
			this.setState({ variantTexts: updatedVariantTexts, baseText: null })
		} else if (updatedVariantTexts.length == 1) {
			this.setState({ variantTexts: updatedVariantTexts, baseText: variantText })
		} else {
			this.setState({ variantTexts: updatedVariantTexts })
		}
	},

	handleBaseTextChange: function (event) {
		const currentBaseText = this.state.baseText
		this.setState({ baseText: event.target.value })
		if (event.target.value == "copy-text") {
			this.addOrRemoveVariantText(currentBaseText)
		} else {
			this.addOrRemoveVariantText(event.target.value)
		}
	},

	handleVariantTextsChange: function (event) {
		let variantText = event.target.value
		this.addOrRemoveVariantText(event.target.value)

	},

	render: function () {
		const form = this
		return (
			<form className="form" onSubmit={this.handleSubmit} action="/collate" method="post">
				<table className="table table-hover table-condensed">
					<thead>
						<tr>
							<th></th>
							<th>Transcript</th>
							<th>Collate Transcript</th>
							<th>Collation Mode</th>
						</tr>
					</thead>
					<tbody>
						{ this.state.transcripts.map( transcript => <CollationFormRow
																													key={transcript.id}
																													id={transcript.id}
																													handleVariantTextsChange={form.handleVariantTextsChange}
																													handleBaseTextChange={form.handleBaseTextChange}
																													handleDragAndDrop={form.handleDragAndDrop}
																													variantTexts={form.state.variantTexts}
																													baseText={form.state.baseText}

																												/>) }

					</tbody>
				</table>
				<input type="button" id="clear-texts" onClick={this.clearTexts} className="btn btn-warning" value="Clear Selection" />
				<input className="btn btn-primary" type="submit" value="Collate" />
			</form>
		)
	},
})

export default DragDropContext(HTML5Backend)(CollationForm)
