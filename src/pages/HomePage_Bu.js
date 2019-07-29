import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from "antd"
import Aerial from "../assets/images/homepage/aerial.png"
import FrontDoor from "../assets/images/homepage/front_door.png"
import "../styles/home-page.scss"
import Plx from 'react-plx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Waypoint } from 'react-waypoint';
import AnimateBuilding from "../components/BuildingAnimate"

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            building_height: 0,
            secondImageHeight: 0,
            End: [],
            Start: [],

            display: false
        }
    }
    componentDidMount = () => {
        $(window).resize(() => {
            const secondImageHeight = $(".second-Image").height()

            this.setState({
                secondImageHeight,
            })
        });
    }
    loadedImage = (height) => {
        console.log("heightss", height)
        this.setState({
            building_height: height,
        })
    }

    enterBuilding = () => {
        console.log("enterBuilding")
        $(".content-fixed").removeClass("home-content-relative")

    }
    leaveBuilding = () => {
        console.log("leaveBuilding")
        $(".content-fixed").addClass("home-content-relative")
    }
    enterSecond = () => {
        console.log("enterSecond")
    }
    leaveSecond = () => {
        console.log("leaveSecond")
    }

    render() {
        const { building_height, secondImageHeight } = this.state
        console.log("state", this.state)

        return (
            <React.Fragment>
                <div className="home-page">
                    <Waypoint
                        onEnter={this.enterBuilding}
                        onLeave={this.leaveBuilding}
                    >
                        <div>
                            <AnimateBuilding loadedImage={this.loadedImage} />
                        </div>
                    </Waypoint>
                    <div className="content-fixed">
                        <Waypoint
                            onEnter={this.enterSecond}
                            onLeave={this.leaveSecond}
                        >
                            <div>
                                < Plx
                                    style={{ opacity: 0 }}
                                    parallaxData={
                                        [{
                                            start: building_height * .90,
                                            end: building_height,
                                            properties: [
                                                {
                                                    startValue: 0,
                                                    endValue: 1,
                                                    property: "opacity"
                                                }
                                            ]
                                        }]}
                                >
                                    <Row type="flex" justify="center" align="bottom">
                                        <Col className="col-image">
                                            <LazyLoadImage
                                                afterLoad={() => this.setState({ secondImageHeight: $(".second-Image").height() })}

                                                style={{ width: "100%" }}
                                                className="second-Image"
                                                src={Aerial} />
                                        </Col>
                                        <Col className="col-description">
                                            <div>
                                                this is just a ext to alogin bottom
                                        </div>

                                        </Col>
                                    </Row>
                                </Plx>
                            </div>
                        </Waypoint>
                        < Plx
                            parallaxData={
                                [{
                                    start: building_height + secondImageHeight,
                                    duration: 400,
                                    properties: [
                                        {
                                            startValue: 1,
                                            endValue: 0,
                                            property: "opacity"
                                        }
                                    ]
                                }]}
                        >
                            <LazyLoadImage
                                style={{ width: "100%" }}
                                src={FrontDoor} />
                        </Plx>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)