import React from 'react'
import assign from 'object-assign'
import CollationFormRow from './CollationFormRow.jsx'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const T = React.PropTypes

const CollationForm = React.createClass({

	propTypes: {
		poemId: T.string.isRequired,
		transcripts: T.array.isRequired,
		handleReset: T.func.isRequired
	},

	getInitialState: function () {
		let baseText = null
		if ( this.props.transcripts ) {
			const transcript = this.props.transcripts[0]
			baseText = transcript['id'] ? transcript.id : null
		}

		const texts = this.props.transcripts.map(transcript => transcript.id)

		return {
			baseText: baseText,
			texts: texts,
			variantTexts: texts
		}
	},

	handleDragAndDrop: function (dragTextId, hoverTextId) {

		// Update the Texts
		const reorderedTranscripts = this.state.texts.slice()
		let dragTextIndex = reorderedTranscripts.indexOf(dragTextId)
		let hoverTextIndex = reorderedTranscripts.indexOf(hoverTextId)
		reorderedTranscripts[hoverTextIndex] = dragTextId
		reorderedTranscripts[dragTextIndex] = hoverTextId

		// Rather than iterate and search for ordering changes in componentWillReceiveProps(), just reorder here
		// Refactor
		const reorderedVariants = this.state.variantTexts.slice()
		dragTextIndex = reorderedVariants.indexOf(dragTextId)
		hoverTextIndex = reorderedVariants.indexOf(hoverTextId)
		reorderedVariants[hoverTextIndex] = dragTextId
		reorderedVariants[dragTextIndex] = hoverTextId

		this.setState({texts: reorderedTranscripts, variantTexts: reorderedVariants})
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
			variantTexts: this.state.variantTexts.filter(e => e != this.state.baseText)
		})
	},

	clearSelection: function() {
		this.setState({variantTexts: [], baseText: null})
	},

	addOrRemoveVariantText: function (variantText) {
		let updatedVariantTexts = this.state.variantTexts.slice()

		// Add a variant text if this has not been added
		if (this.state.variantTexts.indexOf(variantText) == -1) {
			updatedVariantTexts.push(variantText)
		} else {
			updatedVariantTexts = updatedVariantTexts.filter(e => e != variantText)
		}

		let updatedBaseText = this.state.baseText

		// Set the base text to null if this was not a base text
		if (!updatedBaseText && this.state.variantTexts.indexOf(this.state.baseText == -1)) {
			updatedBaseText = null;
		}

		// Refactor
		if (updatedVariantTexts.length == 0) {
			this.setState({ variantTexts: updatedVariantTexts, baseText: null })
		} else if (updatedVariantTexts.length == 1) {
			this.setState({ variantTexts: updatedVariantTexts, baseText: variantText })
		} else if (this.state.baseText == null && updatedVariantTexts.indexOf(variantText) > -1 ) {
			this.setState({ variantTexts: updatedVariantTexts, baseText: variantText })
		} else {
			this.setState({ variantTexts: updatedVariantTexts, baseText: updatedBaseText })
		}
	},

	handleBaseTextChange: function (event) {
		const currentBaseText = this.state.baseText

		// Add the base text to the list of selected texts
		if (currentBaseText && this.state.variantTexts.indexOf(currentBaseText) == -1) {
			this.addOrRemoveVariantText(currentBaseText)
		}

		if (!currentBaseText && event.target.value == "copy-text") {
			this.setState({ baseText: null })
		} else {
			this.setState({ baseText: event.target.value })
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
						{ this.state.texts.map( text => <CollationFormRow
																														key={text}
																														id={text}
																														handleVariantTextsChange={form.handleVariantTextsChange}
																														handleBaseTextChange={form.handleBaseTextChange}
																														handleDragAndDrop={form.handleDragAndDrop}
																														variantTexts={form.state.variantTexts}
																														baseText={form.state.baseText}
																												/>) }

					</tbody>
				</table>
				<input className="btn btn-primary" type="submit" value="Collate" />
				<input type="button" id="clear-selection" onClick={this.clearSelection} className="btn btn-warning" value="Clear Selection" />
				<input type="button" id="reset" onClick={this.props.handleReset} className="btn btn-danger" value="Reset" />
			</form>
		)
	},
})

export default DragDropContext(HTML5Backend)(CollationForm)
