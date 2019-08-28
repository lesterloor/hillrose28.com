import React, { Component } from 'react'
import '../styles/layout/layout.scss'
import Navigation from "../components/Navigation"
import $ from 'jquery';

class Dashboard extends Component {
    render() {

        const { children } = this.props

        return (
            <div className="page-layout">
                <Navigation />
                {children}
            </div>
        )
    }
}

export default Dashboard