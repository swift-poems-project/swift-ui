import React from 'react'
import { Link } from 'react-router'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'
import Collation from '../components/Collation.jsx'
import Websocket from 'react-websocket'

const Poem = React.createClass({

		handleSubmit: function (event) {
			event.preventDefault()

			this.props.fetchCollation({
				poemId: this.state.id,
				baseText: this.state.baseText,
				variantTexts: this.state.variantTexts
			})
		},

		addOrRemoveVariantText: function (variantText) {
			let variantTexts = this.state.variantTexts
			let disabledTexts = this.state.disabledTexts

			if (variantTexts.indexOf(variantText) == -1) {
				variantTexts.push(variantText)
				disabledTexts[variantText] = ''
			} else {
				variantTexts = variantTexts.filter(e => e != variantText)
				disabledTexts[variantText] = 'disabled'
			}

			this.setState({ variantTexts: variantTexts, disabledTexts: disabledTexts })
		},

		handleBaseTextChange: function (event) {
			const currentBaseText = this.state.baseText
			this.setState({ baseText: event.target.value })
			if (event.target.value == "") {
				this.addOrRemoveVariantText(currentBaseText)
			} else {
				this.addOrRemoveVariantText(event.target.value)
			}
		},

		handleVariantTextsChange: function (event) {
			//this.state.variantTexts.filter();
			this.addOrRemoveVariantText(event.target.value)
		},

		getInitialState: function () {
			return {
				id: this.props.params.id,
				baseText: null,
				variantTexts: [],
				disabledTexts: {},
				handleSubmit: this.handleSubmit,
				handleBaseTextChange: this.handleBaseTextChange,
				handleVariantTextsChange: this.handleVariantTextsChange
			}
		},

    componentDidMount: function () {
    	const id = this.props.params.id
			if (!id) {
				throw new Error("No ID specified for the poem")
			}

			this.props.fetchPoem(id)
    },

		componentWillReceiveProps: function (nextProps) {
			const isFetching = nextProps.poem.isFetching
			const transcripts = nextProps.poem.data

			if (!isFetching)
				if (typeof this.props.variantTexts === 'undefined' && typeof transcripts != 'undefined') {
					const disabledTexts = {}
					for (const transcript of transcripts) {
						disabledTexts[transcript] = ''
					}

					this.setState({
						variantTexts: transcripts.map( transcript => transcript.id ),
						disabledTexts: disabledTexts
					})
				}

    },

		isTextDisabled: function (transcriptId) {
			return false
		},

		renderPoem: function (transcripts) {
			//<Link to={`/transcripts/${transcript.id}`}>{ transcript.id }</Link>
			//key={transcript.id}
			//const this.state.disabledTexts

			return (
				<form className="form" onSubmit={this.handleSubmit} action="/collate" method="post">
					<table className="table table-hover table-condensed">
						<thead>
							<tr>
								<th>Transcript</th>
								<th>Collate Transcript</th>
								<th>Collation Mode</th>
							</tr>
						</thead>
						<tbody>
							{ transcripts.map( transcript => <tr key={transcript.id}>
																						     <td scope="row">
																						       <a href={`/transcripts/${transcript.id}`}>{ transcript.id }</a>
																						     </td>
																							   <td>
																								   <input onChange={this.handleVariantTextsChange} name="variant-texts" type="checkbox" defaultChecked="true" id={`variant-${transcript.id}`} value={transcript.id} />
																							   </td>
																							   <td>
																								   <select disabled={this.state.disabledTexts[transcript.id]} onChange={this.handleBaseTextChange}>
  																							     <option defaultValue="true" value="">Compare Text</option>
																									   <option value={`${transcript.id}`}>Base Text</option>
																								   </select>
																							   </td>
																					 	   </tr>) }
					  </tbody>
	    		</table>
					<input className="btn btn-primary" type="submit" value="Collate the Transcripts" />
				</form>
			)
		},

		renderCollation: function (collation, error, isFetching) {

			if (typeof collation === 'undefined')
				if (error)
					return (
						<div>
							<h1>Collation Error</h1>
							<div>
								{error.message}
							</div>
						</div>
					)
				else if (isFetching)
					return (
						<div>
							<h1>Collating...</h1>
						</div>
					)
				else
					return false

			return (
				<div>
					<Collation
							titles={collation.titles}
							headnotes={collation.headnotes}
							body={collation.body}
							footnotes={collation.footnotes}
					/>
				</div>
			)
		},

    render: function () {
			const id = this.props.params.id
			const poem = this.props.poem
			const collation = this.props.collation

			if(typeof poem.data === 'undefined' || poem.isFetching) {
				return <div id="poem"><h1>Loading...</h1></div>
			}

			return (
				<div>
					<section id={`poem-${id}`} className="poem">
						<h1>{ id }</h1>
		  			{ this.renderPoem(poem.data) }
					</section>
					<section className="collection-status">
						<div>

						</div>
					</section>
					<section className="collation-output">
						{ this.renderCollation(collation.data, collation.error, collation.isFetching) }
					</section>
				</div>
			)}
		}
	)

export default withRouter(Poem)
