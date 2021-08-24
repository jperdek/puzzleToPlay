import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import { ManagePuzzleService } from './manage-puzzle.service';
import { PuzzleGeneratorQuadroService } from './puzzle-generator-quadro.service';
import { SetPuzzleAreaOnBoardService } from './set-puzzle-area-on-board.service';


@Injectable({
  providedIn: 'root'
})
export class PuzzleManagerService {

  private static fabricCanvas: fabric.Canvas;
  private static readonly nativeCanvasId = 'supportCanvas';
  private static readonly fabricCanvasId = 'puzzleBoard';
  private static templatePreviewImage: HTMLImageElement | undefined = undefined;

  constructor(
    private puzzleGeneratorQuadroService: PuzzleGeneratorQuadroService,
    private managePuzzleService: ManagePuzzleService,
    private setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService
    ) { }

  public initialize(): void {
    const puzzleBoardWrapperDiv = document.getElementById('puzzleBoardWrapper') as HTMLDivElement;
    if (puzzleBoardWrapperDiv !== null){
        this.createCanvas(puzzleBoardWrapperDiv.offsetWidth, puzzleBoardWrapperDiv.offsetHeight);
    } else {
      console.log('Error: canvas wrapper element not found - cant initialize canvas!');
    }
    this.createHTMLCanvasImage();
  }

  public createCanvas(width = 900, height = 560, fabricCanvasId = PuzzleManagerService.fabricCanvasId): fabric.Canvas {
    PuzzleManagerService.fabricCanvas = new fabric.Canvas(fabricCanvasId, {
      selection: true,
      preserveObjectStacking: true,
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
    PuzzleManagerService.templatePreviewImage = baseImage;

    baseImage.onload = () => {
      if (context !== null) {
        context.drawImage(baseImage, 0, 0);
      }
      console.log(PuzzleManagerService.fabricCanvas.width);
      console.log(PuzzleManagerService.fabricCanvas.height);

      if (PuzzleManagerService.fabricCanvas !== undefined &&
        PuzzleManagerService.fabricCanvas.width !== undefined && PuzzleManagerService.fabricCanvas.height !== undefined) {
        // this.setPuzzleAreaOnBoardService.drawBoard()
        this.puzzleGeneratorQuadroService.divideToPuzzle(canvas, PuzzleManagerService.fabricCanvas,
        baseImage.width, baseImage.height, PuzzleManagerService.fabricCanvas.width, PuzzleManagerService.fabricCanvas.height, 20);
      } else {
        console.log('Error: board canvas not exists or its size is not included!');
      }
    };
  }

  public addPuzzleToBoard(puzzle: Puzzle): void {
    this.managePuzzleService.addPuzzleToBoard(puzzle, PuzzleManagerService.fabricCanvas);
  }

  public getManagePuzzleService(): ManagePuzzleService { return this.managePuzzleService; }

  public getTemplatePreviewImage(): HTMLImageElement | undefined {
    return PuzzleManagerService.templatePreviewImage;
  }
}
