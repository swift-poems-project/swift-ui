import React from 'react'
import { Link } from 'react-router'
import withRouter from 'react-router/lib/withRouter'
import assign from 'object-assign'
import CollationConsole from '../components/CollationConsole.jsx'
import Collation from '../components/Collation.jsx'
import CollationForm from '../components/CollationForm.jsx'
import Websocket from 'react-websocket'

const Poem = React.createClass({

		getInitialState: function () {
			return {
				id: this.props.params.id,
				baseText: null,
				collation: this.props.collation,
				status: "Initializing the session...",
				socketOpen: true
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
			this.props.connectSocket(process.env.WEB_SOCKET_URL)
    },

		componentWillReceiveProps: function (nextProps) {
			if (nextProps.socket.message) {
				const message = nextProps.socket.message
				if (message.collation) {
					const collation = JSON.parse(message.collation) // ?
					this.setState({collation: collation, status: message.status})
				} else {
					this.setState({status: message.status})
				}
			}
		},

		handleReset: function () {
			this.setState({collation: {}, status: "Collation engine reset"})
		},

		fetchCollation: function (params) {
			if (!this.props.socket.webSocket) {
				this.props.connectSocket(process.env.WEB_SOCKET_URL)
			} else {
				const ws = this.props.socket.webSocket
				ws.send( JSON.stringify(params) )
			}
		},

		renderPoem: function (transcripts) {
			return (
				<CollationForm
					poemId={this.props.params.id}
					transcripts={transcripts}
					handleReset={this.handleReset}
					fetchCollation={this.fetchCollation}
					socket={this.props.socket}
				/>
			)
		},

		renderCollation: function (collation) {
			const error = null
			const isFetching = false

			if (typeof collation === 'undefined' || Object.keys(collation).length == 0)
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
			const collation = this.state.collation

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
							<CollationConsole webSocket={this.props.socket} status={this.state.status} />
						</div>
					</section>
					<section className="collation-output">
						{ this.renderCollation(this.state.collation) }
					</section>
				</div>
			)}
		}
	)

export default withRouter(Poem)
