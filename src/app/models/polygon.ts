import { Point } from './point';

export enum Connection {
    hole,
    fill
}

export interface Polygon {
    points: Point[];
    connections: Connection[];
    innerCircles: ImageData[];
}
