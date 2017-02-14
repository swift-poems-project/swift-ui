import React from 'react'
import { findDOMNode } from 'react-dom';
import assign from 'object-assign'
import { DragSource, DropTarget } from 'react-dnd';

const T = React.PropTypes

const rowSource = {
  beginDrag(props) {
    return {
      id: props.id
    }
  },
}

const rowTarget = {
  hover(props, monitor, component) {
    const dragTextId = monitor.getItem().id
    const hoverTextId = props.id

    // Don't replace items with themselves
    if (dragTextId === hoverTextId) {
      return
    }

    // Time to actually perform the action
    props.handleDragAndDrop(dragTextId, hoverTextId)
  },
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const CollationFormRow = React.createClass({

	propTypes: {
		id: T.string.isRequired,
		handleVariantTextsChange: T.func.isRequired,
		handleBaseTextChange: T.func.isRequired,
		handleDragAndDrop: T.func.isRequired,
		variantTexts: T.array.isRequired,
		baseText: T.string
	},

	getInitialState: function () {

		return {
			mode: this.props.baseText == this.props.id ? this.props.id : "copy-text"
		}
	},

	componentWillReceiveProps(nextProps) {
		this.setState({mode: nextProps.baseText == this.props.id ? this.props.id : "copy-text"})
	},

	render: function() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<tr key={this.props.id} style={{ opacity: isDragging ? 0 : 1 }}>
				<td><span className="glyphicon glyphicon-option-horizontal collation-row-grab"></span></td>
				<td scope="row">
					<a href={`/transcripts/${this.props.id}`}>{ this.props.id }</a>
				</td>
				<td>
					<input onChange={this.props.handleVariantTextsChange} name="variant-texts" type="checkbox" id={`variant-${this.props.id}`} value={this.props.id} checked={this.props.variantTexts.indexOf(this.props.id) > -1} />
				</td>
				<td>
					<select disabled={this.props.variantTexts.indexOf(this.props.id) == -1} onChange={this.props.handleBaseTextChange} value={this.state.mode}>
						<option value="copy-text">Compare Text</option>
						<option value={this.props.id}>Base Text</option>
					</select>
				</td>
			</tr>
		))
	}
})

export default DragSource('row', rowSource, dragCollect)(DropTarget('row', rowTarget, dropCollect)(CollationFormRow))
