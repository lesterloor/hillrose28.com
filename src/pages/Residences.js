

import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, } from "antd"
import Plx from 'react-plx';
import { Waypoint } from 'react-waypoint';
import Images from "../components/BuildingFrames"
import Aerial from "../assets/images/homepage/aerial.png"
import Lobby from "../assets/images/homepage/lobby.png"
import Living from "../assets/images/residences/living.png"
import Kitchen from "../assets/images/residences/kitchen.png"
import Bathroom from "../assets/images/residences/bathroom.png"
import FrontDoor from "../assets/images/homepage/front_door.png"
// import "../styles/pages/home.scss"
import "../styles/pages/residences.scss"

class Residences extends Component {
    constructor() {
        super()
        this.state = {
            firstImage: 1,
            secondSectionImage: 1,
            mainContent: 1,
            firstRow: 1,
            secondRow: 1,
            thirdRow: 1,
            lastRow: 1,
            text: 1,
        }
    }
    componentDidMount = () => {
        var pageY = window.pageYOffset;
        var scrollEvent = function (e) {
            console.log("pageY", pageY)
            window.requestAnimationFrame(scrollPlay)
        };
        window.addEventListener('scroll', scrollEvent);
        function scrollPlay() {
            console.log("funcction", pageY)
            window.requestAnimationFrame(scrollPlay)

        }
    }

    loadedImage = (imageRef) => {
        this.setState({
            [imageRef]: $(`.${imageRef}`).height()
        })

    }
    onEnterFirst = (val) => {

    }
    onLeaveFirst = (val) => {


    }


    render() {
        const { firstImage, firstRow, secondRow, lastRow, text } = this.state
        return (
            <React.Fragment>
                <div className="residences-page" style={{ height: firstImage * 2 }}>
                    <Waypoint
                        onEnter={(val) => this.onEnterFirst(val)}
                        onLeave={(val) => this.onLeaveFirst(val)} >

                        <div className="firstRow">
                            <div onLoad={() => this.loadedImage("firstImage")} >
                                <img className="firstImage" src={Living} alt="" />
                            </div>
                        </div>

                    </Waypoint>
                    <div className="mainContent">
                        <Waypoint >
                            <div onLoad={() => this.loadedImage("secondRow")} className="row-section secondRow" >
                                <img className="secondImage" src={Kitchen} alt="" />

                            </div>
                        </Waypoint>


                    </div>



                </div>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Residences)