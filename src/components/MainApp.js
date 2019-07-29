import React, { Component } from 'react'
import '../styles/layout/layout.scss'
import HomeNav from "../components/Navigation"

class Dashboard extends Component {

    render() {
        const { children } = this.props
        return (
            <div className="page-layout">
                <HomeNav />
                {children}
            </div>
        )
    }
}

export default Dashboard