import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import assign from 'object-assign'

import * as actionCreators from './actions/'
import Main from './pages/Main.jsx'

function mapStateToProps (state) {
	return {
		transcript: state.transcript,
		poem: state.poem,
		collation: state.collation,
		notifications: state.notifications
  }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
