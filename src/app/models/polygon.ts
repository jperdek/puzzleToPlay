import { Point } from './point';

export enum Connection {
    hole,
    fill,
    none
}

export interface Polygon {
    points: Point[];
    connections: Connection[];
    innerCircles: ImageData[];
}
