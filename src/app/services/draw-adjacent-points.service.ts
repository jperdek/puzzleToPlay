import { Injectable } from '@angular/core';
import { Connection, Polygon } from '../models/polygon';

@Injectable({
  providedIn: 'root'
})
export class DrawAdjacentPointsService {

  constructor() { }

  public drawCircle(ctx: any, red: number, green: number, blue: number, alpha: number): void {
    const radius = 20;
    const image = ctx.createImageData(2 * radius, 2 * radius);
    const data = image.data;

    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const distance = Math.sqrt(x * x + y * y);

        if (distance > radius) {
          // skip all (x,y) coordinates that are outside of the circle
          continue;
        }

        // Figure out the starting index of this pixel in the image data array.
        const rowLength = 2 * radius;
        const adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
        const adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
        const pixelWidth = 4; // each pixel requires 4 slots in the data array
        const index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;
        data[index] = red;
        data[index + 1] = green;
        data[index + 2] = blue;
        data[index + 3] = alpha;
      }
    }

    ctx.putImageData(image, 0, 0);
  }

  public createConnections(
    imageData: ImageData,
    context: CanvasRenderingContext2D,
    polygon: Polygon,
    bufferedWidth: number,
    radius: number): void {
    let next;
    let smallX;
    let smallY;

    console.log(polygon.points);
    for (let i = 0; i < polygon.points.length; i++){
      if (i + 1 === polygon.points.length) {
        next = 0;
      } else {
        next = i + 1;
      }
      if (polygon.points[i].x > polygon.points[next].x) {
        smallX = polygon.points[next].x;
      } else {
        smallX = polygon.points[i].x;
      }

      if( polygon.points[i].y > polygon.points[next].y) {
        smallY = polygon.points[next].y;
      } else {
        smallY = polygon.points[i].y;
      }
      const middleX = Math.ceil(smallX + Math.abs((polygon.points[next].x - polygon.points[i].x) / 2.0));
      const middleY = Math.ceil(smallY + Math.abs((polygon.points[next].y - polygon.points[i].y) / 2.0));

      if (polygon.connections[i] === Connection.hole) {
        this.drawInnerCircle(imageData, middleX, middleY, bufferedWidth, radius);
      } else if (polygon.connections[i] === Connection.fill) {
        polygon.innerCircles.push(this.saveInnerCircle(imageData, context, middleX, middleY, bufferedWidth, radius))
      }
    }
  }

  public redrawInnerCircles(imageData: ImageData, polygon: Polygon, bufferedWidth: number, radius: number): void {
    let next;
    let saved = 0;
    let smallX;
    let smallY;

    for(let i = 0; i < polygon.points.length; i++){
      if (i + 1 === polygon.points.length) {
        next = 0;
      } else {
        next = i + 1;
      }
      if (polygon.points[i].x > polygon.points[next].x) {
        smallX = polygon.points[next].x;
      } else {
        smallX = polygon.points[i].x;
      }

      if( polygon.points[i].y > polygon.points[next].y) {
        smallY = polygon.points[next].y;
      } else {
        smallY = polygon.points[i].y;
      }
      const middleX = Math.ceil(smallX + Math.abs((polygon.points[next].x - polygon.points[i].x) / 2.0));
      const middleY = Math.ceil(smallY + Math.abs((polygon.points[next].y - polygon.points[i].y) / 2.0));

      if (polygon.connections[i] === Connection.fill) {
        this.pasteInnerCircle(imageData, polygon.innerCircles[saved++], middleX, middleY, bufferedWidth, radius);
      }
    }
  }

  public drawInnerCircle(
    imageData: ImageData,
    positionX: number, positionY: number,
    bufferedWidth: number,
    radius: number = 50): void {
    const pixelWidth = 4;

    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const distance = Math.sqrt(x * x + y * y);

        if (distance > radius) {
          continue;
        }
        const adjustedX = positionX  + x;
        const adjustedY = positionY  + y;

        const index = (adjustedX + (adjustedY * bufferedWidth)) * pixelWidth;
        imageData.data[index] = imageData.data[index];
        imageData.data[index + 1] = imageData.data[index + 1];
        imageData.data[index + 2] = imageData.data[index + 2];
        imageData.data[index + 3] = 0;
      }
    }
  }

  public saveInnerCircle(
    imageData: ImageData,
    context: CanvasRenderingContext2D,
    positionX: number, positionY: number,
    bufferedWidth: number,
    radius: number = 50): ImageData {
    const pixelWidth = 4;
    const image = context.createImageData(2 * radius, 2 * radius);
    const rowLength = 2 * radius;

    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const distance = Math.sqrt(x * x + y * y);

        if (distance > radius) {
          continue;
        }
        const adjustedSavedImageX = radius + x;
        const adjustedSavedImageY = radius + y;
        const adjustedX = positionX + x;
        const adjustedY = positionY + y;

        const index = (adjustedX + (adjustedY * bufferedWidth )) * pixelWidth;
        const indexSavedImage = (adjustedSavedImageX + (adjustedSavedImageY * rowLength)) * pixelWidth;

        image.data[indexSavedImage] = imageData.data[index];
        image.data[indexSavedImage + 1] = imageData.data[index + 1];
        image.data[indexSavedImage + 2] = imageData.data[index + 2];
        image.data[indexSavedImage + 3] = 255;
      }
    }

    return image;
  }

  public pasteInnerCircle(
    imageData: ImageData,
    savedImageData: ImageData,
    positionX: number, positionY: number,
    bufferedWidth: number,
    radius: number = 50): void {
    const pixelWidth = 4;
    const rowLength = 2 * radius;

    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const distance = Math.sqrt(x * x + y * y);

        if (distance > radius) {
          continue;
        }
        const adjustedSavedImageX = radius + x;
        const adjustedSavedImageY = radius + y;
        const adjustedX = positionX + x;
        const adjustedY = positionY + y;

        const index = (adjustedX + (adjustedY * bufferedWidth)) * pixelWidth;
        const indexSavedImage = (adjustedSavedImageX + (adjustedSavedImageY * rowLength)) * pixelWidth;

        imageData.data[index] = savedImageData.data[indexSavedImage];
        imageData.data[index + 1] = savedImageData.data[indexSavedImage + 1];
        imageData.data[index + 2] = savedImageData.data[indexSavedImage + 2];
        imageData.data[index + 3] = 255;
      }
    }
  }

}
