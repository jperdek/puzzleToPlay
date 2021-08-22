import { Injectable } from '@angular/core';
import { Polygon } from '../models/polygon';
import { fabric } from 'fabric';
import { ScanLineService } from './scan-line.service';
import { DrawAdjacentPointsService } from './draw-adjacent-points.service';

@Injectable({
  providedIn: 'root'
})
export class DrawBordersService {

  constructor(private drawAdjacentPointService: DrawAdjacentPointsService) { }

  private createHTMLCanvas(width: number, height: number): HTMLCanvasElement {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = width;
    newCanvas.height = height;
    return newCanvas;
  }

  public drawBorders(
    canvas: fabric.Canvas,
    imageData: ImageData,
    polygon: Polygon,
    radius = 20,
    boardCanvasWidth: number, boardCanvasHeight: number,
    imageCanvasWidth: number, imageCanvasHeight: number): void {


    const newCanvas = this.createHTMLCanvas(2 * radius, 2 * radius);
    const context = newCanvas.getContext('2d');

    if (context !== null) {
      // creates scans
      const scans = this.polygonScan(polygon, imageData.width, imageData.height, 0, 0);

      // draws connection points or saves them
      this.drawAdjacentPointService.createConnections(imageData, context, polygon, imageData.width, radius);
      // hide other content then puzzle itself
      this.drawPolygonFromScans(scans, imageData, 0, imageData.height, imageData.width);
      // redraws connection points - circles - from saved parts
      this.drawAdjacentPointService.redrawInnerCircles(imageData, polygon, imageData.width, radius);
      // create image for given puzzle
      this.putCreatedImage(imageData, imageData.width, imageData.height, canvas,
        boardCanvasWidth, boardCanvasHeight, imageCanvasWidth, imageCanvasHeight);
    }
  }

  public putCreatedImage(
    imageData: ImageData,
    width: number, height: number,
    canvas: fabric.Canvas,
    boardCanvasWidth: number, boardCanvasHeight: number,
    imageCanvasWidth: number, imageCanvasHeight: number): void {
    const newCanvas = this.createHTMLCanvas(width, height);
    newCanvas.getContext('2d')?.putImageData(imageData, 0, 0);

    fabric.Image.fromURL(newCanvas.toDataURL(), (img) => {
        img.left = 0;
        img.top = 0;
        img.scaleToWidth((width / imageCanvasWidth) * boardCanvasWidth);
        img.scaleToHeight((height / imageCanvasHeight) * boardCanvasHeight);
        canvas.add(img);
        img.bringToFront();
    });
  }

  public polygonScan(
    polygon: Polygon,
    width: number, height: number,
    leftOffset: number = 0, rightOffset: number = 0): Map<number, ScanLineService> {

  const minX = leftOffset;
  const maxX = leftOffset + width - 1;
  const minY = rightOffset;
  const maxY = rightOffset + height - 1;

  const numberVertices = polygon.points.length;
  let vector1;
  let vector2;
  let temporaryVector;
  let startY;
  let endY;
  let dx;
  let dy;
  let gradient;
  let x;
  let y;
  let top;
  let bottom;

  const scans = new Map<number, ScanLineService>();

  for (let i = 0; i < numberVertices; i++){
    vector1 = polygon.points[i];

    if (i === numberVertices - 1){
      vector2 = polygon.points[0];
    } else {
      vector2 = polygon.points[i + 1];
    }

    if (vector1.y > vector2.y){
      temporaryVector = vector1;
      vector1 = vector2;
      vector2 = temporaryVector;
    }

    dy = vector2.y - vector1.y;

    if (dy === 0) { continue; }

    top = startY = Math.max(Math.ceil(vector1.y), minY);
    bottom = endY = Math.min(Math.ceil(vector2.y) - 1, maxY);


    dx = vector2.x - vector1.x;

    gradient = dx / dy;

    for (y = startY; y <= endY; y++){
      x = Math.ceil(vector1.x + (y - vector1.y) * gradient);
      x = Math.min(maxX + 1, Math.max(x, minX));
      if (!scans.has(y)){
        scans.set(y, new ScanLineService());
      }
      scans.get(y)?.setBoundary(x);
    }
  }

  return scans;
}

public drawPolygonFromScans(scans: Map<number, ScanLineService>, imageData: ImageData, top: number, bottom: number, width: number): void{
  if (scans !== null && scans !== undefined){
    let y = top;
    let yBuffer;
    let xBufferStart;
    let xBufferEnd;
    let scan;

    while (y <= bottom){
      scan = scans.get(y);
      yBuffer = y * (width * 4);
      if (scan !== undefined && scan.isValid()){
        xBufferStart = scan.left * 4;
        xBufferEnd = scan.right * 4;
        this.fillOutside(imageData, yBuffer, xBufferStart, xBufferEnd, width * 4);
        // this.fillInside(imageData, yBuffer, xBufferStart, xBufferEnd);
      } else {
        // outside area should be erased too - in full range
        this.fillOutside(imageData, yBuffer, width * 4, 0, width * 4);
      }
      y = y + 1;
    }
  }
}

  public fillInside(imageData: ImageData, yBuffer: number, xBufferStart: number, xBufferEnd: number): void {
    for (let i = xBufferStart; i < xBufferEnd; i += 4) {
      imageData.data[yBuffer + i] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 1] = 0;
      imageData.data[yBuffer + i + 2] = 0;
      imageData.data[yBuffer + i + 3] = 255;
    }
  }

  public fillOutside(imageData: ImageData, yBuffer: number, xBufferStart: number, xBufferEnd: number, bufferedWidth: number): void {
    for (let i = 0; i < xBufferStart; i += 4) {
      imageData.data[yBuffer + i] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 1] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 2] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 3] = 0;
    }

    for (let i = xBufferEnd; i < bufferedWidth + 4; i += 4) {
      imageData.data[yBuffer + i] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 1] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 2] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 3] = 0;
    }
  }
}
