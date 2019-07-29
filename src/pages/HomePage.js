import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from "antd"
import Plx from 'react-plx';
import { Waypoint } from 'react-waypoint';
import Images from "../components/BuildingFrames"
import Aerial from "../assets/images/homepage/aerial.png"
import Lobby from "../assets/images/homepage/lobby.png"
import FrontDoor from "../assets/images/homepage/front_door.png"
import "../styles/pages/home.scss"
class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
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


    }
    componentDidMount = () => {
        $(window).resize(() => {
            const secondImageHeight = $(".second-Image").height()

            this.setState({
                secondImageHeight,
            })
        });
        $("#nav-wrapper").removeClass("white-nav")
        var frameNumber = 0, // start video at frame 0
            // lower numbers = faster playback
            playSpeed = 80,
            imageRange = 1,
            totalImages = 30,
            videoHolder = document.querySelectorAll('#video-holder'),
            imgSeq = document.querySelector('.img-seq'),
            i,
            images = [],
            imgName = `${Images.image}`,
            runVideo,
            holdVal,
            scrollEvent = function (e) {
                var pageY = window.pageYOffset;

                if (holdVal === pageY) {
                    window.cancelAnimationFrame(runVideo);
                } else {
                    runVideo = window.requestAnimationFrame(scrollPlay);
                }
            };

        for (i = 0; i <= totalImages;) {
            var filename = imgName,
                img = new Image();

            if (i < 10) {
                filename += '000';
            } else if (i < 100) {
                filename += '00';
            } else if (i < 1000) {
                filename += '0';
            }

            filename += i + '.jpg';
            img.src = Images[i];

            images.push(img);
            i = i + imageRange;
        }

        window.addEventListener('scroll', scrollEvent);

        function scrollPlay() {
            var frameNumber = Math.floor(window.pageYOffset / playSpeed);
            if (frameNumber > 29) {
                if (frameNumber > 40) {
                    console.log("frame", frameNumber)
                    $(".mainContent").addClass("main-content-relative")
                    $("#nav-wrapper").addClass("white-nav")
                }
            } else {
                console.log("frame", frameNumber)

                imgSeq.src = images[frameNumber < 0 ? 0 : frameNumber].src;
            }
        }
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
            $("#nav-wrapper").removeClass("white-nav")
            console.log("turn nav black")
        } else {
        }
    }
    onLeaveFirst = (val) => {
        $(".mainContent").addClass("main-content-relative")
        $("#nav-wrapper").addClass("white-nav")
        $(".home-page").css("height", "100vh")
        console.log("turn nav white")
    }


    render() {
        const { buildingImageHeight, firstRow, secondRow } = this.state
        // console.log("this/state", buildingImageHeight + firstRow + secondRow)
        return (
            <React.Fragment>
                <div className="home-page">
                    <Waypoint
                        topOffset="0px"
                        onEnter={(val) => this.onEnterFirst(val)}
                        onLeave={(val) => this.onLeaveFirst(val)}
                    >
                        <div>
                            <Row style={{ zIndex: 300, }}>
                                <div onLoad={() => this.loadedImage("buildingImageHeight")} id="video-holder" className="video-holder">
                                    <img className="img-seq buildingImageHeight" style={{ width: "100%" }} src={`${Images[0]}`} alt="" />
                                </div>


                            </Row>
                        </div>
                    </Waypoint>
                    < Plx
                        style={{ opacity: 0 }}
                        parallaxData={[{
                            start: buildingImageHeight - (firstRow + firstRow * .3),
                            end: buildingImageHeight,
                            properties: [{
                                startValue: 0,
                                endValue: 1,
                                property: "opacity"
                            }]
                        }]} >
                        <div className="mainContent">
                            <Waypoint >
                                <div onLoad={() => this.loadedImage("firstRow")} className="row-section firstRow" >
                                    < Plx
                                        parallaxData={[{
                                            start: buildingImageHeight,
                                            end: buildingImageHeight + firstRow,
                                            properties: [{
                                                startValue: 1,
                                                endValue: 0,
                                                property: "opacity"
                                            }]
                                        }]} >
                                        <Row type="flex" align="bottom">
                                            <Col className="image-col-with-text">
                                                <img alt="" src={Aerial} style={{ width: "100%" }} />
                                            </Col>
                                            <Col className="image-col-description image-description-right">
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet</p>
                                            </Col>
                                        </Row>
                                    </Plx>
                                </div>
                            </Waypoint>
                            <Waypoint>
                                <div onLoad={() => this.loadedImage("secondRow")} className=" row-section secondRow" >
                                    < Plx parallaxData={[{
                                        start: buildingImageHeight + firstRow,
                                        end: buildingImageHeight + firstRow + secondRow,
                                        properties: [{
                                            startValue: 1,
                                            endValue: 0,
                                            property: "opacity"
                                        }]
                                    }]}>
                                        <img alt="" src={FrontDoor} style={{ width: "100%" }} />
                                    </Plx>
                                </div>
                            </Waypoint>
                            <Waypoint >
                                <div onLoad={() => this.loadedImage("firstRow")} className="row-section firstRow" >
                                    < Plx
                                        parallaxData={[{
                                            start: buildingImageHeight - firstRow,
                                            end: buildingImageHeight,
                                            properties: [{
                                                startValue: 1,
                                                endValue: 1,
                                                property: "opacity"
                                            }]
                                        }]} >
                                        <Row type="flex" align="bottom">
                                            <Col className="image-col-with-text">
                                                <img alt="" src={Lobby} style={{ width: "100%" }} />
                                            </Col>
                                            <Col className="image-col-description image-description-right">
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet</p>
                                            </Col>
                                        </Row>
                                    </Plx>
                                </div>
                            </Waypoint>
                        </div>
                    </Plx>



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