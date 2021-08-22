import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Connection } from '../models/polygon';
import { PuzzleGeneratorQuadroService } from '../puzzle-generator-quadro.service';
import { DrawBordersService } from '../services/draw-borders.service';

@Component({
  selector: 'app-puzzle-board',
  templateUrl: './puzzle-board.component.html',
  styleUrls: ['./puzzle-board.component.scss'],
})
export class PuzzleBoardComponent implements OnInit {
  fabricCanvas?: fabric.Canvas;
  constructor(
    private drawBordersService: DrawBordersService,
    private puzzleGeneratorQuadroService: PuzzleGeneratorQuadroService) {}

  ngOnInit(): void {}

  public createCanvas(): void {
    this.fabricCanvas = new fabric.Canvas('puzzleBoard', {
      selection: true,
      width: 900,
      height: 560,
    });
    this.fabricCanvas.setZoom(1);

    // this.setBackgroundImagee(this.fabricCanvas, '/assets/test1.jpg');

    this.createHTMLCanvasImage();
  }

  public createNativeFabricImage(): void {
    fabric.Image.fromURL('/assets/test1.jpg', (img: fabric.Image) => {
      // img.scaleToWidth(250);
      // img.scaleToHeight(500);
      this.fabricCanvas?.add(img);
      this.fabricCanvas?.renderAll();
      if(img.width !== undefined && img.scaleX !== undefined && img.height !== undefined && img.scaleY !== undefined) {
        this.processImage(img.width * img.scaleX * 2, img.height * img.scaleY * 2);
      }
    });
  }

  private createHTMLCanvasImage(): void {
    const canvas = document.getElementById('supportCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const baseImage = new Image();
    baseImage.src = 'assets/test1.jpg';
    baseImage.onload = () => {
      if (context !== null) {
        context.drawImage(baseImage, 0, 0);
      }
       //this.processImageHTMLCanvas(canvas, 500, 756);
      if (this.fabricCanvas !== undefined) {
       this.puzzleGeneratorQuadroService.divideToPuzzle(canvas, this.fabricCanvas, 500, 756);
      }
    }
  }

  public processImage(width: number, height: number): void {
    if (this.fabricCanvas !== undefined) {
      const context = this.fabricCanvas.getContext();
      //const width = this.fabricCanvas.getWidth();
      //const height = this.fabricCanvas.getHeight();
      console.log(width);
      console.log(height);
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

      this.drawBordersService.drawBorders(
        this.fabricCanvas,
        imageData,
        polygon,
      );
    } else {
      console.log('Error: undefined canvas');
    }
  }


  public processImageHTMLCanvas(canvas: HTMLCanvasElement, width: number, height: number): void {
    const context = canvas.getContext('2d');
    if (context !== null && this.fabricCanvas !== undefined) {
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

        this.drawBordersService.drawBorders(
          this.fabricCanvas,
          imageData,
          polygon,
        );
    } else {
      console.log('Error: undefined canvas');
    }
  }
}
