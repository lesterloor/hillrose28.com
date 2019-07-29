import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Images from "../components/BuildingFrames"
class Building extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount = () => {
        var frameNumber = 0,
            // start video at frame 0
            // lower numbers = faster playback
            playSpeed = 100,
            imageRange = 1,
            totalImages = 30,
            // videoHolder = document.querySelectorAll('#video-holder'),
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
            console.log(filename, Images[i])
            img.src = Images[i];
            console.log("img", img)

            images.push(img);
            i = i + imageRange;
        }

        // videoHolder[0].style.height = (totalImages / imageRange) * playSpeed + "px";

        window.addEventListener('scroll', scrollEvent);

        function scrollPlay() {
            var frameNumber = Math.floor(window.pageYOffset / playSpeed);
            imgSeq.src = images[frameNumber].src;
            console.log("framed", imgSeq.src = images[frameNumber].src;)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="video-holder" className="video-holder">
                    <img className="img-seq" style={{ width: "100%" }} src={`${Images[0]}`} alt />
                </div>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Building)