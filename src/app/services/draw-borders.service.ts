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

  public drawBorders(canvas: fabric.Canvas, imageData: ImageData, width: number, height: number, polygon: Polygon): void {
    const data = imageData.data;
    let pos = 0;
    const radius = 20;
    console.log('DRawing');
    for (let y = 0; y < imageData.height /2; y++) {
      for (let x = 0; x < imageData.width; x++) {
        //imageData.data[pos] = imageData.data[pos];
        //pos++;
        //imageData.data[pos++] = 0;
        //imageData.data[pos++] = 0;
        //imageData.data[pos++] = 255;
      }
    }
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', '_temp_canvas1');
    newCanvas.width = 2 * radius;
    newCanvas.height = 2 * radius;
    const context = newCanvas.getContext('2d');
    if (context !== null) {
      const scans = this.polygonScan(polygon, imageData.width, imageData.height, 0, 0);
      
      this.drawAdjacentPointService.createConnections(imageData, context, polygon, imageData.width, radius);
      this.drawPolygonFromScans(scans, imageData, 0, imageData.height, imageData.width);
      
      this.drawAdjacentPointService.redrawInnerCircles(imageData, polygon, imageData.width, radius);
      //this.drawAdjacentPointService.drawInnerCircle(imageData, 100, 0, imageData.width);
      this.putCreatedImage(imageData, imageData.width, imageData.height, canvas);
    }
  }

  public putCreatedImage(imageData: ImageData, width: number, height: number,canvas: fabric.Canvas): void {
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', '_temp_canvas');
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.getContext('2d')?.putImageData(imageData, 0, 0);

    fabric.Image.fromURL(newCanvas.toDataURL(), (img) => {
        img.left = 0;
        img.top = 0;
        console.log('DOne');
        img.scaleToHeight(560);
        canvas.add(img);
        img.bringToFront();
    });
  }

  
  public polygonScan(polygon: Polygon, width: number, height: number, leftOffset: number = 0, rightOffset: number = 0): Map<Number, ScanLineService> {
		var minX = leftOffset;
		var maxX = leftOffset + width - 1;
		var minY = rightOffset;
		var maxY = rightOffset + height - 1;
		
		var numberVertices = polygon.points.length;
		var vector1, vector2, temporaryVector;
		var startY, endY;
		var dx, dy;
		var gradient;
		var x, y;
		let top, bottom;

		let scans = new Map<Number, ScanLineService>();
		
		for(let i=0; i< numberVertices; i++){
			vector1 = polygon.points[i];
			
			if(i == numberVertices - 1){
				vector2 = polygon.points[0]
			} else {
				vector2 = polygon.points[i + 1]
			}
			
			if(vector1.y > vector2.y){
				temporaryVector = vector1;
				vector1 = vector2;
				vector2 = temporaryVector;
			}
		
			dy = vector2.y - vector1.y;
			
			if(dy == 0) { continue; }
			
			top = startY = Math.max(Math.ceil(vector1.y), minY);
			bottom = endY = Math.min(Math.ceil(vector2.y) - 1, maxY);
		
			
			dx = vector2.x - vector1.x;
			
			gradient = dx / dy;
			
			for(y=startY; y<=endY; y++){
				x = Math.ceil(vector1.x + (y - vector1.y) * gradient);
				x = Math.min(maxX + 1, Math.max(x, minX));
				if(!scans.has(y)){
					scans.set(y,new ScanLineService());
				}
				scans.get(y)?.setBoundary(x);
			}
			
		}
		
		return scans;
	}

  public drawPolygonFromScans(scans: Map<Number, ScanLineService>, imageData: ImageData, top: number, bottom: number, width: number): void{
		if(scans !== null && scans !== undefined){
			let y = top;
      let yBuffer;
      let xBufferStart;
      let xBufferEnd;
			let scan;
			while(y <= bottom){
				scan = scans.get(y);
        yBuffer = y * (width * 4);
				if(scan !== undefined && scan.isValid()){
          xBufferStart = scan.left * 4;
          xBufferEnd = scan.right * 4;
          this.fillOutside(imageData, yBuffer, xBufferStart, xBufferEnd, width * 4);
          //this.fillInside(imageData, yBuffer, xBufferStart, xBufferEnd);
				}
				y = y + 1;
			}
		}
	}

  public fillInside(imageData: ImageData, yBuffer: number, xBufferStart: number, xBufferEnd: number): void {
    for(let i = xBufferStart; i< xBufferEnd; i+=4) {
      imageData.data[yBuffer + i] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 1] = 0;
      imageData.data[yBuffer + i + 2] = 0;
      imageData.data[yBuffer + i + 3] = 255;
    }
  }

  public fillOutside(imageData: ImageData, yBuffer: number, xBufferStart: number, xBufferEnd: number, bufferedWidth: number): void {
    for(let i = 0; i< xBufferStart; i+=4) {
      imageData.data[yBuffer + i] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 1] = imageData.data[yBuffer + i];;
      imageData.data[yBuffer + i + 2] = imageData.data[yBuffer + i];;
      imageData.data[yBuffer + i + 3] = 0;
    }

    for(let i = xBufferEnd; i< bufferedWidth; i+=4) {
      imageData.data[yBuffer + i] = imageData.data[yBuffer + i];
      imageData.data[yBuffer + i + 1] = imageData.data[yBuffer + i];;
      imageData.data[yBuffer + i + 2] = imageData.data[yBuffer + i];;
      imageData.data[yBuffer + i + 3] = 0;
    }
  }
}
