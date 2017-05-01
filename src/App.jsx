import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import assign from 'object-assign'

import * as actionCreators from './actions/'
import Main from './pages/Main.jsx'

function mapStateToProps (state) {
	return {
		notifications: state.notifications,
		socket: state.socket,
		poem: state.poem,
		transcript: state.transcript,
		collation: state.collation
  }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
