import { Injectable } from '@angular/core';
import { DrawBordersService } from './draw-borders.service';
import { Point } from '../models/point';
import { Connection, Polygon } from '../models/polygon';

@Injectable({
  providedIn: 'root'
})
export class PuzzleGeneratorQuadroService {

  maxSquareSizeHeight = 75;
  maxSquareSizeWidth = 65;
  maxPointRangeColumn = 25;
  maxPointRangeRow = 25;
  fillProbability = 0.5;

  constructor(private drawBordersService: DrawBordersService) { }


  public divideToPuzzle(
    sourceCanvas: HTMLCanvasElement,
    targetCanvas: fabric.Canvas,
    photoCanvasWidth: number,
    photoCanvasHeight: number,
    boardCanvasWidth: number,
    boardCanvasHeight: number,
    radius: number): void {
    const context = sourceCanvas.getContext('2d');
    if (context !== null && targetCanvas !== undefined) {
      const pointMap = this.createPointMap(photoCanvasWidth, photoCanvasHeight);
      const polygons = this.createPolygonsFromPointMap(pointMap, context);
      polygons.forEach(polygon => this.processPolygon(polygon, photoCanvasWidth, photoCanvasHeight, targetCanvas,
        context, radius, boardCanvasWidth, boardCanvasHeight));
    } else {
      console.log('Error: context is null or one of canvases not exists');
    }
  }

  public processPolygon(
    polygon: Polygon,
    width: number, height: number,
    targetCanvas: fabric.Canvas,
    sourceContext: CanvasRenderingContext2D,
    radius = 20,
    boardCanvasWidth: number,
    boardCanvasHeight: number): void {
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    polygon.points.forEach(point => {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });

    const newWidth = maxX - minX;
    const newHeight = maxY - minY;
    const imageData = sourceContext.getImageData(minX - radius, minY - radius,
                                                 newWidth + 2 * radius, newHeight + 2 * radius);

    polygon.points.forEach(point => {
      point.x = radius + point.x - minX;
      point.y = radius + point.y - minY;
    });

    this.drawBordersService.drawBorders(
      targetCanvas,
      imageData,
      polygon,
      radius,
      boardCanvasWidth, boardCanvasHeight,
      width, height,
    );
  }

  public drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, thickness: number): void {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = thickness;
    context.strokeStyle = '#cfc';
    context.stroke();
  }

  private drawScheme(
    sourceContext: CanvasRenderingContext2D,
    leftBottomPoint: Point,
    leftTopPoint: Point,
    rightTopPoint: Point,
    rightBottomPoint: Point): void {

      this.drawLine(sourceContext, leftBottomPoint.x, leftBottomPoint.y, leftTopPoint.x,
        leftTopPoint.y, 1);
      this.drawLine(sourceContext, leftTopPoint.x,
        leftTopPoint.y, rightTopPoint.x, rightTopPoint.y, 2);
      this.drawLine(sourceContext, rightTopPoint.x, rightTopPoint.y,
        rightBottomPoint.x, rightBottomPoint.y, 5);
      this.drawLine(sourceContext, rightBottomPoint.x, rightBottomPoint.y,
          leftBottomPoint.x, leftBottomPoint.y, 1);
  }

  public createPolygonsFromPointMap(pointMap: Point[][], sourceContext: CanvasRenderingContext2D): Polygon[] {
    const polygons: Polygon[] = [];
    let topConnection: Connection;
    let rightConnection: Connection;
    let bottomConnection: Connection;
    let leftConnection: Connection;

    for (let i = 1; i < pointMap.length; i++) {
      for (let j = 1; j < pointMap[i].length; j++) {
         const leftTopPoint = pointMap[i - 1][j - 1];
         const rightTopPoint = pointMap[i - 1][j];
         const leftBottomPoint = pointMap[i][j - 1];
         const rightBottomPoint = pointMap[i][j];

         this.drawScheme(sourceContext, leftBottomPoint, leftTopPoint, rightTopPoint, rightBottomPoint);
 
         if (i === 1) {
          topConnection = Connection.none;
        } else if (polygons[polygons.length - pointMap[i].length + 1].connections[3] === Connection.fill) {
          topConnection = Connection.hole;
         } else {
          topConnection = Connection.fill;
         }

         if (j === 1) {
          leftConnection = Connection.none;
         } else if (polygons[polygons.length - 1].connections[2] === Connection.fill) {
          leftConnection = Connection.hole;
         } else {
          leftConnection = Connection.fill;
         }

         // NEEDS TO BE GENERATED
         if (i === pointMap.length - 1) {
          bottomConnection = Connection.none;
         } else if (Math.random() > this.fillProbability){
          bottomConnection = Connection.fill;
         } else {
          bottomConnection = Connection.hole;
         }

        // NEEDS TO BE GENERATED
         if (j === pointMap[i].length - 1) {
          rightConnection = Connection.none;
         } else if (Math.random() > this.fillProbability){
          rightConnection = Connection.fill;
         } else {
          rightConnection = Connection.hole;
         }

         const polygon: Polygon = {
          points: [
            Object.assign({}, leftBottomPoint),
            Object.assign({}, leftTopPoint),
            Object.assign({}, rightTopPoint),
            Object.assign({}, rightBottomPoint)
          ],
          connections: [ leftConnection, topConnection, rightConnection, bottomConnection],
          innerCircles: []
        };

         polygons.push(polygon);
      }
    }
    return polygons;
  }

  public randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public createPointMap(width: number, height: number): Point[][] {
    const pointMap: Point[][] = [];
    const numberRows = Math.floor(height / this.maxSquareSizeHeight) + 1;
    const numberColumns = Math.floor(width / this.maxSquareSizeWidth) + 1;
    let initialValueColumn = -1;
    let randomColumn;
    let randomRow;

    for (let i = 0; i < numberRows; i++) {
      pointMap[i] = [];
      if (i === 0) {
        initialValueColumn = 0;
      } else {
        initialValueColumn = -1;
      }

      for (let j = 0; j < numberColumns; j++) {
        // first point
        if (i === 0 && j === 0) {
          pointMap[i][j] = { x: 0, y: 0 };
          continue;
        }


        // last point will be right bottom corner
        if (i === numberRows - 1 && j === numberColumns - 1) {
          pointMap[i][j] = { x: width, y: height };
          continue;
        }

        // generates random number except from beginning column
        if (initialValueColumn !== 0) {
          randomColumn = this.randomNumber(0, this.maxPointRangeRow);
        } else {
          randomColumn = initialValueColumn;
        }

        // generates random number except begining row
        if (j !== 0) {
          randomRow = this.randomNumber(0, this.maxPointRangeRow);
        } else {
          randomRow = 0;
        }

        // if last column is treated, then it should rightmost point
        if (j === numberColumns - 1) {
          pointMap[i][j] = { x: width, y: this.maxSquareSizeHeight * i - randomColumn };
          continue;
        }

        // if last row is treated, then it should be point on below
        if (i === numberRows - 1) {
          pointMap[i][j] = { x: this.maxSquareSizeWidth * j - randomRow, y: height };
          continue;
        }
        if (this.maxSquareSizeHeight * i - randomColumn < 0) {
          console.log(i + ' ' + j);
        }

        pointMap[i][j] = { x: this.maxSquareSizeWidth * j - randomRow, y: this.maxSquareSizeHeight * i - randomColumn};
      }
    }
    return pointMap;
  }
}
