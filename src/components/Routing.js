import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import Context from '../Context'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainAppContainer from '../containers/MainAppContainer'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import Residences from '../pages/Residences'
import Availability from '../pages/Availability'

class Routing extends Component {
    static contextType = Context
    componentDidMount() {
        // console.log("fetching component... routing")
    }
    render() {
        return (
            <Router onUpdate={() => console.log("updated")}>
                <Switch>
                    <MainAppContainer>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/contact" component={ContactPage} />
                        <Route exact path="/residences" component={Residences} />
                        <Route exact path="/availability" component={Availability} />

                    </MainAppContainer>
                </Switch>
            </Router>
        )
    }
}
const mapStateToProps = state => ({
    register: state.register
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Routing)