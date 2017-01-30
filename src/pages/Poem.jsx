import React from 'react'
import { Link } from 'react-router'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'
import Collation from '../components/Collation.jsx'
import CollationForm from '../components/CollationForm.jsx'
import Websocket from 'react-websocket'

const Poem = React.createClass({

		getInitialState: function () {
			return {
				id: this.props.params.id,
				baseText: null,
			}
		},

		/**
		 * Retrieve the Poem data once the component has mounted
		 *
		 */
    componentDidMount: function () {
    	const id = this.props.params.id
			if (!id) {
				throw new Error("No ID specified for the poem")
			}

			this.props.fetchPoem(id)
    },

		handleReset: function () {
			this.props.resetCollation()
		},

		renderPoem: function (transcripts) {
			return (
				<CollationForm
					poemId={this.props.params.id}
					transcripts={transcripts}
					handleReset={this.handleReset}
					fetchCollation={this.props.fetchCollation}
				/>
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
