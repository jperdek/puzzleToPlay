import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import { ManagePuzzleService } from './manage-puzzle.service';
import { PuzzleGeneratorQuadroService } from './puzzle-generator-quadro.service';


@Injectable({
  providedIn: 'root'
})
export class PuzzleManagerService {

  static fabricCanvas: fabric.Canvas;
  public static readonly nativeCanvasId = 'supportCanvas';
  public static readonly fabricCanvasId = 'puzzleBoard';

  constructor(
    private puzzleGeneratorQuadroService: PuzzleGeneratorQuadroService,
    private managePuzzleService: ManagePuzzleService
    ) { }

  public initialize(): void {
    this.createCanvas();
    this.createHTMLCanvasImage();
  }

  public createCanvas(width = 900, height = 560, fabricCanvasId = PuzzleManagerService.fabricCanvasId): fabric.Canvas {
    PuzzleManagerService.fabricCanvas = new fabric.Canvas(fabricCanvasId, {
      selection: true,
      width,
      height,
    });
    PuzzleManagerService.fabricCanvas.setZoom(1);
    return PuzzleManagerService.fabricCanvas;
  }

  public createHTMLCanvasImage(puzzleImagePath = 'assets/test1.jpg', nativeCanvasId = PuzzleManagerService.nativeCanvasId): void {
    const canvas = document.getElementById(nativeCanvasId) as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const baseImage = new Image();
    baseImage.src = puzzleImagePath;
    baseImage.onload = () => {
      if (context !== null) {
        context.drawImage(baseImage, 0, 0);
      }

      if (PuzzleManagerService.fabricCanvas !== undefined) {
       this.puzzleGeneratorQuadroService.divideToPuzzle(canvas, PuzzleManagerService.fabricCanvas, 500, 756, 900, 560, 20);
      }
    };
  }

  public addPuzzleToBoard(puzzle: Puzzle): void {
    this.managePuzzleService.addPuzzleToBoard(puzzle, PuzzleManagerService.fabricCanvas);
  }

  public getManagePuzzleService(): ManagePuzzleService { return this.managePuzzleService; }
}
