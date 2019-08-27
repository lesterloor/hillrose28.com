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
            firstRow: 1,
            secondRow: 1,
            thirdRow: 1,
            lastRow: 1,
            End: [],
            Start: [],
            display: false
        }
    }

    componentDidMount = () => {
        $(window).resize(() => {
            const firstRow = $(".firstRow").height()
            const secondRow = $(".secondRow").height()
            const thirdRow = $(".thirdRow").height()

            this.setState({
                firstRow, secondRow, thirdRow
            })
        });
        $("#nav-wrapper").removeClass("white-nav")
        var frameNumber = 0, // start video at frame 0
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
            $(".toggle-icon").removeClass("black-burger")
            $(".header").addClass("transparent-header")

            //
        } else {
        }
    }
    onLeaveFirst = (val) => {
        $(".mainContent").addClass("main-content-relative")

        $(".home-page").css("height", "100vh")
        $(".toggle-icon").addClass("black-burger")
        $(".header").removeClass("transparent-header")

        console.log("turn nav white")
    }


    render() {
        const { buildingImageHeight, firstRow, secondRow, thirdRow, lastRow } = this.state
        console.log("state", this.state)
        return (
            <React.Fragment>
                <div className="home-page">
                    <Waypoint
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
                                            end: buildingImageHeight + firstRow + secondRow,
                                            properties: [{
                                                startValue: 1,
                                                endValue: 0,
                                                property: "opacity"
                                            }]
                                        }]} >
                                        <img alt="" src={Aerial} className="section-text-image" />
                                        <div className="image-col-description " style={{ minHeight: firstRow, textAlign: "right" }}>
                                            <p className="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut nonummy nibh euismod laoreet</p>
                                        </div>
                                    </Plx>
                                </div>
                            </Waypoint>

                            <Waypoint>
                                <div onLoad={() => this.loadedImage("secondRow")} className="row-section secondRow" >
                                    < Plx parallaxData={[{

                                        start: buildingImageHeight + firstRow,
                                        end: buildingImageHeight + firstRow + secondRow,
                                        properties: [{
                                            startValue: 1,
                                            endValue: 0,
                                            property: "opacity"
                                        }]
                                    }]}>
                                        <img alt="" style={{ width: "100%" }} src={FrontDoor} />
                                    </Plx>
                                </div>
                            </Waypoint>
                            <Waypoint >
                                <div onLoad={() => this.loadedImage("thirdRow")} className="row-section thirdRow" >
                                    < Plx
                                        parallaxData={[{
                                            start: buildingImageHeight + firstRow + secondRow,
                                            // end: buildingImageHeight + firstRow + secondRow + middleRow,
                                            duration: 150,
                                            properties: [{
                                                startValue: 1,
                                                endValue: 0,
                                                property: "opacity"
                                            }]
                                        }]} >
                                        <Row className="middle-row-container" type="flex" >
                                            <div className="image-col-description " style={{ textAlign: "right", minHeight: lastRow, width: "100%" }}>
                                                <div className="text">
                                                    <span>Building Blah</span><br />
                                                    <span>OLERE MAGNA ALIQUAM</span><br />
                                                    <p className="middle-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet</p>
                                                </div>
                                            </div>
                                            {/* <Col className="image-col-description middle-section-text ">
                                                <span>Building Blah</span><br />
                                                <span>OLERE MAGNA ALIQUAM</span><br />
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet</p>
                                            </Col> */}
                                        </Row>
                                    </Plx>
                                </div>
                            </Waypoint>
                            <Waypoint >
                                <div onLoad={() => this.loadedImage("lastRow")} className="row-section lastRow" >
                                    <img alt="" src={Lobby} className="section-text-image" />
                                    <div className="image-col-description " style={{ minHeight: lastRow, textAlign: "right" }}>
                                        <p className="description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut nonummy nibh euismod laoreet</p>
                                    </div>
                                    {/* <Row type="flex" align="bottom">
                                        <Col className="image-col-with-text">
                                            <img alt="" src={Lobby} className="section-text-image" />
                                        </Col>
                                        <Col className="image-col-description image-description-right">
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet</p>
                                        </Col>
                                    </Row> */}
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