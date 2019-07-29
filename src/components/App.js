import React, { Component } from 'react'
import Routing from './Routing'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUnits } from "../state/actions/fetchAction"

class App extends Component {
    componentWillMount() {
        console.log("fetching component... App", this.props)
        this.props.fetchUnits()
    }
    render() {
        return (
            <Routing />
        )
    }
}
const mapStateToProps = state => ({
    state: state.fetchReducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUnits
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
