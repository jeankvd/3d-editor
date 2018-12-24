import React, { Component } from "react";
import styled from "styled-components";
import { Stage, Container, Sprite, withPixiApp } from "@inlet/react-pixi"; //import PIXI render engine

const Wrap = styled.div`
    border: 1px solid #333;
    width: 420px;
    height: 480px;
    margin: 0 auto;
`;

const Depth = new PIXI.Sprite.fromImage("http://i.imgur.com/tZsAgFP.jpg");
let f = new PIXI.filters.DisplacementFilter(Depth, 1);
// const displacement = new PIXI.filters.DisplacementFilter(Depth, 0);

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseY: 0,
            mouseX: 0
        };   
    }

    /* Update the displacement filter with new distortion values */
    componentDidUpdate(prevProps, prevState) {
        f.scale.x = (window.innerWidth/2 - this.state.mouseX) / 60;
        f.scale.y = (window.innerHeight/2 - this.state.mouseY) / 60;
    }

    /* Save position of mouse in relation to the image Container */
    handleMouseMove = (e) => {
        this.setState({ mouseX: e.clientX, mouseY : e.clientY });
    }

    /* Reset displacement filter's distortion params */
    handleMouseLeave = (e) => {
        f.scale.x = 1;
        f.scale.y = 1;
    }

    render() {
        return (
            <Stage width={400} height={400} onMount={this.onMount} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
                <Container position={[0,0]}>
                    {/* Foreground */}
                    <Sprite filters={[f]}  image="http://i.imgur.com/n0WMktI.jpg" />
                    {/* Background (ehh, not sure if necessary tbh)  */}
                    <Sprite image={"http://i.imgur.com/tZsAgFP.jpg"} renderable={false} />
                    {/* Addition */}
                    <Sprite width="200" height="200" image={"https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"} />
                </Container>
            </Stage>
        );
    }
}

export default withPixiApp(ImageContainer);
