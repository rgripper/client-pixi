import * as React from 'react';
import * as PIXI from "pixi.js";
import { generatePlayArea } from 'SimHelper';

export interface CanvasProps {
    width: number
    height: number
}

export default class Canvas extends React.Component<CanvasProps> {

    private readonly app = new PIXI.Application();

    private canvasContainer: HTMLElement | null = null;

    constructor(props: CanvasProps) {
        super(props);

        const app = this.app;

        const area = generatePlayArea();

        area.structures.forEach(struct => {
          const graphics = new PIXI.Graphics();
          graphics.lineStyle(2, 0xdd3300, undefined, 0);
          graphics.drawRect(struct.position.x, struct.position.y, struct.size.width, struct.size.height);
          app.stage.addChild(graphics);
        });

        // app.ticker.add(() => {

        // });

    }

    componentDidMount() {
        this.canvasContainer!.appendChild(this.app.view);
    }

    render() {
        return (
            <div ref={ref => this.canvasContainer = ref}></div>
        );
    }
}