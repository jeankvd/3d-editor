import React, { Component } from "react";
import styled from "styled-components";
import { Stage, Container, Sprite, withPixiApp } from "@inlet/react-pixi"; //import PIXI render engine

const Wrap = styled.div`
    border: 1px solid #333;
    width: 420px;
    height: 480px;
    margin: 0 auto;
`;

// var stage = new PIXI.Container();
// var container = new PIXI.Container();
// var foreground = new PIXI.Container();
// stage.addChild(container);
// stage.addChild(foreground);

// var mousex = w/2, mousey = h/2;

// function animate() {
// console.log('aaaaaaaaaa');
//   f.scale.x = (window.innerWidth/2 - mousex) / 80;
//   f.scale.y = (window.innerHeight/2 - mousey) / 80;
//   fg.addChild(d);
//   d.renderable=false;

//   renderer.render(stage);
//   requestAnimationFrame(animate);
// }

const ploader = new PIXI.loaders.Loader();

const Depth = new PIXI.Sprite.fromImage("http://i.imgur.com/tZsAgFP.jpg");
let f = new PIXI.filters.DisplacementFilter(Depth, 1);
// const displacement = new PIXI.filters.DisplacementFilter(Depth, 0);

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseY: 0
        };
        this.mousemove = new PIXI.filters.DisplacementFilter(Depth, this.state.mouseY + 100)
    }

    componentDidMount() {
    }

    onMount = () => {
    };

    startMagic = () => {
        // animate();
    };

    handleMouseMove = (e) => {
        this.setState({ mouseX: e.clientX, mouseY : e.clientY });
    }

    animate = () => {

    }

    render() {
        return (
            <Stage width={400} height={400} onMount={this.onMount} onMouseMove={this.handleMouseMove}>
                <Container position={[0,0]}>
                    {/* Foreground */}
                    <Sprite filters={[new PIXI.filters.DisplacementFilter(Depth, this.state.mouseY)]}  image="http://i.imgur.com/n0WMktI.jpg" />
                    {/* Background  */}
                    
                    <Sprite image={"http://i.imgur.com/tZsAgFP.jpg"} renderable={false} />
                </Container>
            </Stage>
        );
    }
}

export default withPixiApp(ImageContainer);
