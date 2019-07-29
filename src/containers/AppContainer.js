import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from "../components/App.js"
class AppContainer extends Component {

    render() {
        return (
            <div>
                <App />
            </div>)
    }
}


const mapStateToProps = state => ({ state: state.testReducer })
const getDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, getDispatchToProps)(AppContainer)