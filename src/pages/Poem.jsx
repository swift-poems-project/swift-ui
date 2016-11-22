import React from 'react'
import { Link } from 'react-router'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'

const Poem = React.createClass({

		handleSubmit: function (event) {
			event.preventDefault()
			console.log(this.state)
			this.props.fetchCollation({
				baseText: this.state.baseText,
				variantTexts: this.state.variantTexts
			})
		},

		handleBaseTextChange: function (event) {
			this.setState({ baseText: event.target.value })
		},

		handleVariantTextsChange: function (event) {
			this.setState({ variantTexts: [ event.target.value ] })
		},

		getInitialState: function () {
			return {
				baseText: null,
				variantTexts: [],
				handleSubmit: this.handleSubmit,
				handleBaseTextChange: this.handleBaseTextChange,
				handleVariantTextsChange: this.handleVariantTextsChange
			}
		},

    componentDidMount: function () {
    	const id = this.props.params.id
			if (!id) {
	    	// handle no id
			}

			this.props.fetchPoem(id)
			this.props.router.setRouteLeaveHook(this.props.route, this.onExit)
    },

		renderPoem: function (transcripts) {
			//<Link to={`/transcripts/${transcript.id}`}>{ transcript.id }</Link>
			//key={transcript.id}
			return (
				<form className="form" onSubmit={this.handleSubmit} action="/collate" method="post">
					<table className="table table-hover table-condensed">
						<thead>
							<tr>
								<th>View Transcript</th>
								<th>Collate Transcript</th>
								<th>Collation Mode</th>
						  	<th>Transcript ID</th>
							</tr>
						</thead>
						<tbody>
							{ transcripts.map( transcript => <tr key={transcript.id}>
																						   <th scope="row">
																						     <a href={`/transcripts/${transcript.id}`} className="btn btn-info">View</a>
																						   </th>
																							 <td>
																								 <input name="variant-texts" type="checkbox" checked="true" id={`variant-${transcript.id}`} value={transcript.id}/>
																							 </td>
																							 <td>
																								 <select onChange={this.handleBaseTextChange}>
  																							   <option selected="true" value="variant">Variant Text</option>
																									 <option value="base">Base Text</option>
																								 </select>
																							 </td>
																						   <td>{ transcript.id }</td>
																					 	 </tr>) }
					  </tbody>
	    		</table>
					<input className="btn btn-primary" type="submit" value="Collate the Transcripts" />
				</form>
			)
		},

    render: function () {
			const id = this.props.params.id
			const { data, isFetching } = this.props.poem

			if(typeof data === 'undefined' || isFetching) {
				return <div id="poem"><h1>Loading...</h1></div>
			}

			return (
				<div id="poem">
					<h1>{ id }</h1>
		  		{ this.renderPoem(data) }
				</div>
			)}
		}
	)

export default withRouter(Poem)
