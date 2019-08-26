import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import ReactSVG from 'react-svg'
import Logo from "../assets/images/SVG/logo.svg"

import "../styles/layout/navigation.scss"
class Navigation extends Component {

    render() {

        return (
            <div className="header">
                <div className="header-menu">
                    <input class="toggle" id="toggle" type="checkbox" />
                    <label class="toggle-label" for="toggle"><span class="toggle-icon"></span><span class="toggle-text"></span></label>
                </div>
                <div className="header-nav">
                    <NavLink id="items" to="/" className="nav-item">Building</NavLink>
                    <NavLink id="items" to="/residences" className="nav-item">Residences</NavLink>
                    <NavLink id="items" to="/penthouses" className="nav-item">Penthouses</NavLink>
                    <NavLink id="items" to="/amenities" className="nav-item">Amenities</NavLink>
                    <NavLink id="items" to="/neighborhood" className="nav-item">Neighborhood</NavLink>
                    <NavLink id="items" to="/availability" className="nav-item">Availability</NavLink>
                    <NavLink id="items" to="/team" className="nav-item">Team</NavLink>
                    <NavLink id="items" to="/press" className="nav-item">Press</NavLink>
                    <NavLink id="items" to="/contact" className="nav-item">Contact</NavLink>
                    <div className="header-logo">
                        <ReactSVG className="logo" src={Logo} />
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // toggleGlobalSidebar
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)