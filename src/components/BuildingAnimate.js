import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Images from "../components/BuildingFrames"
import Aerial from "../assets/images/homepage/aerial.png"
import "../styles/buildingAnimate.scss"
import Plx from 'react-plx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Icon } from 'antd';

class AnimateBuilding extends Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            building_height: false,
            End: [],
            Start: [],
        }
    }
    componentDidMount = () => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
        $(window).resize(() => {
            const Image = $(".building-image").height()
            this.props.loadedImage(Image)

            const End = []
            const Start = []
            for (var i = 1; i <= 10; i++) {
                Start.push(i === 10 ? Image - 100 : Image * Number(`.${i}`) - 100)
                End.push(i === 10 ? Image : Image * Number(`.${i}`))

            }
            this.setState({

                End,
                Start,
                building_height: Image,
                loaded: true
            })
        });
    }
    loadedImage = () => {
        const Image = $(".building-image").height()
        this.props.loadedImage(Image)
        const End = []
        const Start = []
        for (var i = 1; i <= 10; i++) {
            Start.push(i === 10 ? Image - 100 : Image * Number(`.${i}`) - 100)
            End.push(i === 10 ? Image : Image * Number(`.${i}`))

        }
        this.setState({
            End,
            Start,
            building_height: Image,
            loaded: true
        })

    }


    render() {
        const { loaded, End, Start, building_height } = this.state
        return (
            <React.Fragment>
                <div style={{ height: building_height }} className="animate-building">
                    < Plx
                        className="first-image"
                        style={{ "zIndex": 300 }}
                        parallaxData={
                            [{
                                start: 0,
                                end: 100,
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
                            className="building-image"
                            afterLoad={() => this.loadedImage()}
                            src={Images[0]} />
                    </Plx>
                    {loaded ? (<div>
                        {Images.map((path, val) => (

                            < Plx
                                onPlxEnd={End[val] === building_height * .8 ? this.endBuilding : null}
                                key={val}
                                className="first-image"
                                style={{ "zIndex": 300 - val }}
                                parallaxData={
                                    [{
                                        start: Start[val],
                                        end: End[val] === building_height ? 0 : End[val],
                                        properties: [
                                            {
                                                startValue: 1,
                                                endValue: val === 9 ? 1 : 0,
                                                property: "opacity"
                                            }
                                        ]
                                    }]}
                            >
                                <LazyLoadImage
                                    className="building-image"
                                    src={path} />


                            </Plx>


                        ))}

                    </div>) : <Icon type="loading" />

                    }


                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AnimateBuilding)