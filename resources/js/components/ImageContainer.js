import React, { Component } from "react";
import styled from "styled-components";
import {
    Stage,
    Container,
    Sprite,
    withPixiApp,
    PixiComponent
} from "@inlet/react-pixi"; //import PIXI render engine

const Wrap = styled.div`
    position: absolute;
    visibility: hidden;
`;

let Depth = new PIXI.Sprite.fromImage("/images/depth.jpeg");
let f = new PIXI.filters.DisplacementFilter(Depth, 1);
let d = new PIXI.filters.ColorMatrixFilter();
d.desaturate(1);
// const displacement = new PIXI.filters.DisplacementFilter(Depth, 0);

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseY: 0,
            mouseX: 0,
            image: "",
            image2: "/images/test.jpg",
            forceCanvas: false
        };
    }

    /* Update the displacement filter with new distortion values */
    componentDidUpdate(prevProps, prevState) {
        f.scale.x = (window.innerWidth / 2 - this.state.mouseX) / 60;
        f.scale.y = (window.innerHeight / 2 - this.state.mouseY) / 60;
    }

    /* Save position of mouse in relation to the image Container */
    handleMouseMove = e => {
        this.setState({ mouseX: e.clientX, mouseY: e.clientY });
    };

    /* Reset displacement filter's distortion params */
    handleMouseLeave = e => {
        f.scale.x = 1;
        f.scale.y = 1;
        this.setState({ image: "" });
    };

    /* Save Canvas as an Image */
    handleClick = () => {
        this.setState({ forceCanvas: true }, () => {
            console.log(Depth, f);

            let canvasSave = document.getElementById("resetCanvas1");
            canvasSave.getContext("webgl", { preserveDrawingBuffer: false });
            let d = canvasSave.toDataURL("image/png", 1);
            Depth = new PIXI.Sprite.fromImage(d);
            f = new PIXI.filters.DisplacementFilter(Depth, 1);
            // const w = window.open('about:blank', 'image from canvas');
            // w.document.write("<img src='"+d+"' alt='from canvas'/>");
            let canvasSave2 = document.getElementById("resetCanvas");
            canvasSave2.getContext("webgl", { preserveDrawingBuffer: false });
            let e = canvasSave2.toDataURL("image/png", 1);
            this.setState({ image: d, image2: e });
        });
    };

    render() {
        return (
            <div>
                <Stage
                    id="resetCanvas"
                    options={{ preserveDrawingBuffer: true }}
                    width={400}
                    height={400}
                    onMount={this.onMount}
                    onMouseMove={this.handleMouseMove}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleClick}
                >
                    <Container position={[0, 0]}>
                        {/* Foreground */}
                        <Sprite filters={[f]} image={this.state.image2} />
                        {/* Background (ehh, not sure if necessary tbh)  */}
                        {/* Addition */}
                        {!this.state.image ? (
                            <Sprite
                                width="200"
                                height="200"
                                image={
                                    "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                                }
                            />
                        ) : null}
                    </Container>
                </Stage>
                {/* Depth Container */}
                <Wrap>
                    <Stage
                        id="resetCanvas1"
                        options={{ preserveDrawingBuffer: true }}
                        width={400}
                        height={400}
                        onMount={this.onMount}
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        onClick={this.handleClick}
                    >
                        <Container position={[0, 0]}>
                            {/* Foreground */}
                            <Sprite image="/images/depth.jpeg" />
                            {/* Background (ehh, not sure if necessary tbh)  */}
                            {/* Addition */}
                            <Sprite
                                filters={[d]}
                                width="200"
                                height="200"
                                image={
                                    "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                                }
                            />
                        </Container>
                    </Stage>
                </Wrap>
                <img src={this.state.image} alt="" />
            </div>
        );
    }
}

export default withPixiApp(ImageContainer);
