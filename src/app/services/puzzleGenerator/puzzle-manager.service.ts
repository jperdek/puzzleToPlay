import { Injectable, Sanitizer } from '@angular/core';
import { fabric } from 'fabric';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import { ImageSizeManagerService } from './image-size-manager.service';
import { ManagePuzzleService } from './manage-puzzle.service';
import { PuzzleGeneratorQuadroService } from './puzzle-generator-quadro.service';
import { SetPuzzleAreaOnBoardService } from './set-puzzle-area-on-board.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class PuzzleManagerService {

  private static puzzleBoard: fabric.Canvas;
  private static readonly nativeCanvasId = 'supportCanvas';
  private static readonly fabricCanvasId = 'puzzleBoard';
  private static templatePreviewImage: SafeResourceUrl | undefined = undefined;
  private radius = 20;

  constructor(
    private puzzleGeneratorQuadroService: PuzzleGeneratorQuadroService,
    private managePuzzleService: ManagePuzzleService,
    private setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService,
    private imageSizeManagerService: ImageSizeManagerService,
    private sanitizer: DomSanitizer
    )
    { this.managePuzzleService.setPuzzleAreaOnBoardService(this.setPuzzleAreaOnBoardService); }

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
    PuzzleManagerService.puzzleBoard = new fabric.Canvas(fabricCanvasId, {
      selection: true,
      preserveObjectStacking: true,
      width,
      height,
    });
    PuzzleManagerService.puzzleBoard.setZoom(1);
    return PuzzleManagerService.puzzleBoard;
  }

  public createHTMLCanvasImage(puzzleImagePath = 'assets/test1.jpg', nativeCanvasId = PuzzleManagerService.nativeCanvasId): void {
    const canvas = document.getElementById(nativeCanvasId) as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const baseImage = new Image();
    baseImage.src = puzzleImagePath;

    // prepare preview image
    PuzzleManagerService.templatePreviewImage = this.sanitizer.bypassSecurityTrustResourceUrl(puzzleImagePath);

    baseImage.onload = () => {
      if (context !== null) {
        context.drawImage(baseImage, 0, 0);
      }

      if (PuzzleManagerService.puzzleBoard !== undefined &&
        PuzzleManagerService.puzzleBoard.width !== undefined && PuzzleManagerService.puzzleBoard.height !== undefined) {
          const interBoardSize = this.imageSizeManagerService.getSizeAccordingAspectRatio(
            this.setPuzzleAreaOnBoardService.getPlayableWidth(PuzzleManagerService.puzzleBoard.width),
            this.setPuzzleAreaOnBoardService.getPlayableHeight(PuzzleManagerService.puzzleBoard.height),
            baseImage.width / baseImage.height);
          this.setPuzzleAreaOnBoardService.drawBoard(interBoardSize.x, interBoardSize.y,
          PuzzleManagerService.puzzleBoard);
          this.puzzleGeneratorQuadroService.divideToPuzzle(canvas, PuzzleManagerService.puzzleBoard,
        baseImage.width, baseImage.height, interBoardSize.x, interBoardSize.y, this.radius);
      } else {
        console.log('Error: board canvas not exists or its size is not included!');
      }
    };
  }

  public addPuzzleToBoard(puzzle: Puzzle): void {
    this.managePuzzleService.addPuzzleToBoard(puzzle, PuzzleManagerService.puzzleBoard);
  }

  public getManagePuzzleService(): ManagePuzzleService { return this.managePuzzleService; }

  public getTemplatePreviewImage(): SafeResourceUrl | undefined {
    return PuzzleManagerService.templatePreviewImage;
  }

  public clean(): void {
    this.managePuzzleService.removeAllFromStore();
    this.setPuzzleAreaOnBoardService.cleanBoardAll(PuzzleManagerService.puzzleBoard);
  }
}
