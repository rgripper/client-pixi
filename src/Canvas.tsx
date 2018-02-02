import * as React from 'react';
import * as PIXI from "pixi.js";

export interface CanvasProps {
    width: number
    height: number
}

export default class Canvas extends React.Component<CanvasProps> {

    private readonly renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private canvasContainer: HTMLElement | null = null;

    constructor(props: CanvasProps) {
        super(props);
        this.renderer = PIXI.autoDetectRenderer(props.width, props.height);

    }

    componentDidMount() {
        this.canvasContainer!.appendChild(this.renderer.view);
    }

    render() {
        return (
            <div ref={ref => this.canvasContainer = ref}></div>
        );
    }
}