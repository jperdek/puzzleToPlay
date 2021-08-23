import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Connection } from '../models/polygon';
import { DrawBordersService } from '../services/draw-borders.service';

@Injectable({
  providedIn: 'root'
})
export class OldPuzzleService {

  constructor(private drawBordersService: DrawBordersService) { }

  public createNativeFabricImage(fabricCanvas: fabric.Canvas): void {
    fabric.Image.fromURL('/assets/test1.jpg', (img: fabric.Image) => {
      fabricCanvas?.add(img);
      fabricCanvas?.renderAll();
      if (img.width !== undefined && img.scaleX !== undefined && img.height !== undefined && img.scaleY !== undefined) {
        this.processImage(img.width * img.scaleX * 2, img.height * img.scaleY * 2, fabricCanvas);
      }
    });
  }

  public processImage(width: number, height: number, fabricCanvas: fabric.Canvas): void {
    if (fabricCanvas !== undefined) {
      const context = fabricCanvas.getContext();
      const imageData = context.getImageData(0, 0, width, height);
      const polygon = {
        points: [
          { x: 200, y: 0 },
            { x: 100, y: 756 },
            { x: 500, y: 756 },
            { x: 400, y: 0 },
        ],
        connections: [
          Connection.hole,
          Connection.hole,
          Connection.hole,
          Connection.hole
        ],
        innerCircles: []
      };

      this.drawBordersService.drawBordersAndInsertToBoard(
        fabricCanvas,
        imageData,
        polygon,
        20,
        500, 560,
        900, 756
      );
    } else {
      console.log('Error: undefined canvas');
    }
  }


  public processImageHTMLCanvas(canvas: HTMLCanvasElement, width: number, height: number, fabricCanvas: fabric.Canvas): void {
    const context = canvas.getContext('2d');
    if (context !== null && fabricCanvas !== undefined) {
        const imageData = context.getImageData(0, 0, width, height);
        const polygon = {
          points: [
            { x: 100, y: 500 },
            { x: 200, y: 0 },
            { x: 400, y: 0 },
            { x: 500, y: 756 },
          ],
          connections: [
            Connection.fill,
            Connection.hole,
            Connection.hole,
            Connection.fill
          ],
          innerCircles: []
        };

        this.drawBordersService.drawBordersAndInsertToBoard(
          fabricCanvas,
          imageData,
          polygon,
          20,
          500, 560,
          900, 756
        );
    } else {
      console.log('Error: undefined canvas');
    }
  }
}
