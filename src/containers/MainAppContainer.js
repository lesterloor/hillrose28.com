import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainApp from '../components/MainApp'
import { fetchUnits } from "../state/actions/fetchAction"
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class DashboardContainer extends Component {
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname === "/") {
            } else {
                $(".toggle-icon").addClass("black-burger")
                $(".header").removeClass("transparent-header")
            }
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    render() {

        return (
            <MainApp>
                {this.props.children}
            </MainApp>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUnits
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardContainer))