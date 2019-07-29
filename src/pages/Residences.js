import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from "antd"
import Plx from 'react-plx';
import { Waypoint } from 'react-waypoint';
import Living from "../assets/images/residences/living.png"
import Kitchen from "../assets/images/residences/kitchen.png"
import Bathroom from "../assets/images/residences/bathroom.png"
import "../styles/pages/residences.scss"
class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            bathRoomScrollPosition: 9000,
            buildingImageHeight: 1,
            secondSectionImage: 1,
            buildingContainer: 1,
            thirdSectionImage: 1,
            mainContent: 1,
            secondRow: 1,
            firstRow: 1,
            End: [],
            Start: [],
            display: false
        }
    }
    componentWillMount = () => {
        $("nav-wrapper").addClass("transparent-nav")
        console.log("will")

    }
    componentDidMount = () => {
        $("#nav-wrapper").addClass("white-nav")
    }
    loadedImage = (imageRef) => {
        this.setState({
            [imageRef]: $(`.${imageRef}`).height()
        })

    }
    onEnterFirst = (val) => {
        if (val.previousPosition === "above") {
            $(".mainContent").removeClass("main-content-relative")
            $(".home-page").css("height", "5000px")

            console.log("enter")

        } else {
        }

    }
    onLeaveFirst = (val) => {
        $(".mainContent").addClass("main-content-relative")

        $(".home-page").css("height", "100vh")
        console.log("left first")
    }
    onEnteredBathroom = () => {
        var scrollTop = window.pageYOffset
        this.setState({ bathRoomScrollPosition: scrollTop })
        if (scrollTop < 2000) {
            console.log("scrollTop bath", scrollTop)

        } else {
            // $(".bathroomrow").addClass("bathroomrow-fixed")
        }

    }

    render() {
        const { bathRoomScrollPosition } = this.state
        return (
            <React.Fragment>
                <div className="residences-page">
                    <Waypoint
                        topOffset="100px"
                        onEnter={(val) => this.onEnterFirst(val)}
                        onLeave={(val) => this.onLeaveFirst(val)}
                    >
                        <div>
                            <Row style={{ zIndex: 300, }}>
                                <div onLoad={() => this.loadedImage("buildingImageHeight")} id="video-holder" className="video-holder">
                                    <img className="img-seq buildingImageHeight" style={{ width: "100%" }} src={Living} alt="" />
                                </div>


                            </Row>
                        </div>
                    </Waypoint>
                    <div className="mainContent">
                        <Waypoint
                            topOffset="0"
                            onEnter={() => console.log("entered secondddddddddddddddddddd")}
                        >
                            <div onLoad={() => this.loadedImage("firstRow")}  >

                                <Row type="flex" align="bottom">
                                    <img alt="" src={Kitchen} style={{ width: "100%" }} />
                                </Row>
                                <Row className="section-text" justify="end">
                                    <p className="text">
                                        <span className="red-text">RESIDENCES BLAH</span>
                                        <br />
                                        <span className="red-grey">OLORE MAGNA ALIQUAM</span>
                                        <br />
                                        <p className="text-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.</p>
                                    </p>
                                </Row>


                            </div>
                        </Waypoint>
                        <Waypoint
                            onPositionChanger={(val) => { console.log("onPositionChanger second", val) }}
                            onEnter={(val) => { }}
                            onLeave={this.onEnteredBathroom}
                        >
                            <div onLoad={() => this.loadedImage("secondRow")} className=" row-section secondRow" >

                                <Row type="flex" align="bottom">
                                    <Col className="image-description image-description-left">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit, consectetur adipiscing elit.consectetur adipiscing elit..</p>
                                    </Col>
                                    <Col className="image-col">
                                        <img alt="" src={Kitchen} style={{ width: "100%" }} />
                                    </Col>
                                </Row>

                            </div>
                        </Waypoint>
                        <Waypoint
                            onLeave={(val) => { }}
                        >
                            <div onLoad={() => this.loadedImage("firstRow")} className="row-section bathroomrow" >

                                <Row type="flex" align="bottom">
                                    <Col className="image-col">
                                        < Plx
                                            onPlxStart={() => console.log("started bathgroom trans")}
                                            parallaxData={
                                                [{
                                                    start: bathRoomScrollPosition,
                                                    duration: 500,
                                                    properties: [
                                                        {
                                                            startValue: 0,
                                                            endValue: 800,
                                                            property: "translateX"
                                                        }
                                                    ]
                                                }]}
                                        >
                                            <div className="bathroomDiv" style={{ backgroundImage: `url(${Bathroom})` }} />
                                            {/* <img src={Bathroom} style={{ width: "100%" }} /> */}

                                        </Plx>
                                    </Col>
                                    <Col className="image-description image-description-right">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.</p>
                                    </Col>
                                </Row>

                            </div>
                        </Waypoint>
                    </div>
                    {/* <Waypoint
                        onEnter={(val) => { console.log("entered third", val) }}
                        onLeave={(val) => { console.log("left fourth", val) }}
                    >
                        <div className="mainContent">
                            <Row type="flex" align="bottom">
                                <img src={Aerial} className="secondSectionImage" style={{ width: "100%" }} />
                            </Row>
                        </div>
                    </Waypoint> */}

                    {/* <div className="mainContent">
                        <Row type="flex" align="bottom">
                            <Col className="image-col">
                                <img src={Aerial} className="secondSectionImage" style={{ width: "100%" }} />
                            </Col>
                            <Col className="image-description">
                                <p>this is just sample teext</p>
                            </Col>
                        </Row>

                    </div> */}

                    {/* <Row>
                            <Plx
                                onPlxStart={() => $(".main-content").removeClass("main-content-relative")}
                                onPlxEnd={() => $(".main-content").addClass("main-content-relative")}
                                parallaxData={[{
                                    start: buildingImageHeight === 0 ? 4000 : buildingImageHeight + secondSectionImage,
                                    end: buildingImageHeight === 0 ? 4000 : buildingImageHeight + secondSectionImage + thirdSectionImage,
                                    properties: [
                                        {
                                            startValue: 1,
                                            endValue: 1,
                                            property: 'opacity',
                                        },
                                    ],
                                },]}
                            >
                                <img onLoad={() => this.loadedImage("thirdSectionImage")} src={FrontDoor} className="thirdSectionImage" style={{ width: "100%" }} />
                            </Plx>
                        </Row> */}

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