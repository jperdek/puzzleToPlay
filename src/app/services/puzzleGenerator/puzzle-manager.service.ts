import { Injectable, Sanitizer } from '@angular/core';
import { fabric } from 'fabric';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import { ImageSizeManagerService } from './image-size-manager.service';
import { ManagePuzzleService } from './manage-puzzle.service';
import { PuzzleGeneratorQuadroService } from './puzzle-generator-quadro.service';
import { SetPuzzleAreaOnBoardService } from './set-puzzle-area-on-board.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ManipulationHandlerService } from '../puzzleEvents/manipulation-handler.service';
import { Point } from 'src/app/models/point';
import { ResizeHandlerService } from '../puzzleEvents/resize-handler.service';
import { ZoomManagerService } from '../puzzleEvents/zoom-manager.service';
import { DisableControlsService } from '../utils/disable-controls.service';


@Injectable({
  providedIn: 'root'
})
export class PuzzleManagerService {

  private static puzzleBoard: fabric.Canvas;
  private static readonly nativeCanvasId = 'supportCanvas';
  private static readonly fabricCanvasId = 'puzzleBoard';
  private static templatePreviewImage: SafeResourceUrl | undefined = undefined;
  private radius = 20;
  private baseImageAspectRatio: number = 800 / 900;

  constructor(
    private puzzleGeneratorQuadroService: PuzzleGeneratorQuadroService,
    private managePuzzleService: ManagePuzzleService,
    private setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService,
    private imageSizeManagerService: ImageSizeManagerService,
    private sanitizer: DomSanitizer,
    private manipulationHandlerService: ManipulationHandlerService,
    private resizeHandlerService: ResizeHandlerService,
    private zoomManagerService: ZoomManagerService,
    private disableControlsService: DisableControlsService
    )
    { this.managePuzzleService.setPuzzleAreaOnBoardService(this.setPuzzleAreaOnBoardService); }

  public initialize(): void {
    const puzzleBoardWrapperDiv = document.getElementById('puzzleBoardWrapper') as HTMLDivElement;
    if (puzzleBoardWrapperDiv !== null){
      this.createCanvas(puzzleBoardWrapperDiv.offsetWidth, puzzleBoardWrapperDiv.offsetHeight);
    } else {
      console.log('Error: canvas wrapper element not found - cant initialize canvas!');
    }
    this.startGame();
  }

  public createCanvas(width = 900, height = 560, fabricCanvasId = PuzzleManagerService.fabricCanvasId): fabric.Canvas {
    PuzzleManagerService.puzzleBoard = new fabric.Canvas(fabricCanvasId, {
      selection: true,
      preserveObjectStacking: true,
      width,
      height,
    });
    PuzzleManagerService.puzzleBoard.setZoom(1);

    // register for manipulation events - in case of resizing
    this.manipulationHandlerService.registerCanvasOnManipulationEvents(PuzzleManagerService.puzzleBoard, this);
    this.zoomManagerService.registerZoomOnMouseWheel(PuzzleManagerService.puzzleBoard);
    this.disableControlsService.removeScalingOptionsForGroups();
    return PuzzleManagerService.puzzleBoard;
  }


  public startGame(puzzleImagePath = 'assets/test1.jpg',
                   nativeCanvasId = PuzzleManagerService.nativeCanvasId,
                   randomAngle = true): void {
    this.clean();
    // prepare preview image
    PuzzleManagerService.templatePreviewImage = this.sanitizer.bypassSecurityTrustResourceUrl(puzzleImagePath);

    this.createHTMLCanvasImage(puzzleImagePath, nativeCanvasId, randomAngle);
  }


  public createHTMLCanvasImage(puzzleImagePath = 'assets/test1.jpg',
                               nativeCanvasId = PuzzleManagerService.nativeCanvasId,
                               randomAngle = true): void {
    const canvas = document.getElementById(nativeCanvasId) as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    const baseImage = new Image();
    baseImage.src = puzzleImagePath;

    baseImage.onload = () => {
      if (context !== null) {
        context.drawImage(baseImage, 0, 0);
        // for some images aspect ratio can be problem - needs to reset size and redraw from image
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        context.drawImage(baseImage, 0, 0);
      }

      this.startGameInitializationFunction(baseImage, canvas, randomAngle);
    };
  }

  public startGameInitializationFunction(baseImage: HTMLImageElement, canvas: HTMLCanvasElement, randomAngle = true): void {
    this.baseImageAspectRatio = baseImage.width / baseImage.height;
    this.resizeHandlerService.registerResizeHandler(PuzzleManagerService.puzzleBoard,
        this.setPuzzleAreaOnBoardService, this.baseImageAspectRatio, 'puzzleBoardWrapper');

    if (PuzzleManagerService.puzzleBoard !== undefined &&
        PuzzleManagerService.puzzleBoard.width !== undefined && PuzzleManagerService.puzzleBoard.height !== undefined) {
          const interBoardSize = this.imageSizeManagerService.getSizeAccordingAspectRatio(
            this.setPuzzleAreaOnBoardService.getPlayableWidth(PuzzleManagerService.puzzleBoard.width),
            this.setPuzzleAreaOnBoardService.getPlayableHeight(PuzzleManagerService.puzzleBoard.height),
            this.baseImageAspectRatio);
          this.setPuzzleAreaOnBoardService.drawBoard(interBoardSize.x, interBoardSize.y,
          PuzzleManagerService.puzzleBoard);
          this.puzzleGeneratorQuadroService.divideToPuzzle(canvas, PuzzleManagerService.puzzleBoard,
        baseImage.width, baseImage.height, interBoardSize.x, interBoardSize.y, this.radius, randomAngle);
      } else {
        console.log('Error: board canvas not exists or its size is not included!');
      }
  }
  public addPuzzleToBoard(puzzle: Puzzle): void {
    if (PuzzleManagerService.puzzleBoard.width !== undefined && PuzzleManagerService.puzzleBoard.height !== undefined) {
      const interBoardSize = this.imageSizeManagerService.getSizeAccordingAspectRatio(
        this.setPuzzleAreaOnBoardService.getPlayableWidth(PuzzleManagerService.puzzleBoard.width),
        this.setPuzzleAreaOnBoardService.getPlayableHeight(PuzzleManagerService.puzzleBoard.height),
        this.baseImageAspectRatio);
      this.managePuzzleService.addPuzzleToBoard(puzzle, PuzzleManagerService.puzzleBoard, interBoardSize.x, interBoardSize.y);
    } else {
      console.log('Error: board width and height are undefined. Cant insert puzzle!');
    }
  }

  public getManagePuzzleService(): ManagePuzzleService { return this.managePuzzleService; }

  public getTemplatePreviewImage(): SafeResourceUrl | undefined {
    return PuzzleManagerService.templatePreviewImage;
  }

  public clean(): void {
    this.managePuzzleService.removeAllFromStore();
    this.setPuzzleAreaOnBoardService.cleanBoardAll(PuzzleManagerService.puzzleBoard);
  }

  public getActualImageAspectRatio(): number { return this.baseImageAspectRatio; }

  public getSizeAccordingAspectRatio(): Point {
    if (PuzzleManagerService.puzzleBoard.width !== undefined && PuzzleManagerService.puzzleBoard.height !== undefined) {
      return this.imageSizeManagerService.getSizeAccordingAspectRatio(
        this.setPuzzleAreaOnBoardService.getPlayableWidth(PuzzleManagerService.puzzleBoard.width),
        this.setPuzzleAreaOnBoardService.getPlayableHeight(PuzzleManagerService.puzzleBoard.height),
        this.baseImageAspectRatio);
    } else {
      console.log('Error: board width and height are undefined. Cant insert puzzle!');
      return { x: 0, y: 0 };
    }
  }

  public getZoomManagerService(): ZoomManagerService { return this.zoomManagerService; }

  public getPuzzleBoard(): fabric.Canvas { return PuzzleManagerService.puzzleBoard; }
}
