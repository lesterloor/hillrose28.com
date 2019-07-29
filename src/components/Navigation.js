import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import $ from 'jquery';
import { NavLink } from 'react-router-dom'
// import logo from "../assets/images//Hillrose_logo_white.png"
import "../styles/layout/navigation.scss"
class HomeNavigation extends Component {
    constructor() {
        super()
        this.state = {
            menuOpened: false
        }
    }
    toggleMenu = () => {
        // var isOpened = $("#burger-2").hasClass("clicked")
        // isOpened ? helpers.fadeOutNav() : helpers.fadeInNav()
    }
    componentDidMount = () => {

    }
    render() {

        return (
            <div id="nav-wrapper" className="white-nav">
                <div id="burger-container" onClick={this.toggleMenu}>
                    <div id="burger-1" className='burger'></div>
                    <div id="burger-2" className='burger'></div>
                    <div id="burger-3" className='burger'></div>
                </div>
                <div className="nav-item-container">
                    <NavLink id="items" to="/" className="menu-item">Building</NavLink>
                    <NavLink id="items" to="/residences" className="menu-item">Residences</NavLink>
                    <NavLink id="items" to="/penthouses" className="menu-item">Penthouses</NavLink>
                    <NavLink id="items" to="/amenities" className="menu-item">Amenities</NavLink>
                    <NavLink id="items" to="/neighborhood" className="menu-item">Neighborhood</NavLink>
                    <NavLink id="items" to="/availability" className="menu-item">Availability</NavLink>
                    <NavLink id="items" to="/team" className="menu-item">Team</NavLink>
                    <NavLink id="items" to="/press" className="menu-item">Press</NavLink>
                    <NavLink id="items" to="/contact" className="menu-item">Contact</NavLink>

                    <div id="logo-container">
                        <div className="logo-text">
                            <p><span>181</span></p>
                            <p><span>HILLROSE</span>28</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigation)