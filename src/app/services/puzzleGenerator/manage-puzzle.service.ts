import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fabric } from 'fabric';
import { ExtendedPuzzle } from 'src/app/models/extendedPuzzle';
import { PuzzleAppState } from 'src/app/store';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import { addPuzzle, returnPuzzle } from 'src/app/store/puzzles/puzzles.actions';
import { PuzzleControllerManagerService } from '../puzzleControllers/puzzle-controller-manager.service';
import { SetPuzzleAreaOnBoardService } from './set-puzzle-area-on-board.service';


@Injectable({
  providedIn: 'root'
})
export class ManagePuzzleService {

  private puzzleAreaOnBoardService?: SetPuzzleAreaOnBoardService;

  constructor(
    private store: Store<PuzzleAppState>,
    private puzzleControllerManagerService: PuzzleControllerManagerService) { }

  public setPuzzleAreaOnBoardService(setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService): void {
    this.puzzleAreaOnBoardService = setPuzzleAreaOnBoardService;
  }

  public addPuzzleToBoard(puzzle: Puzzle, boardCanvas: fabric.Canvas): void {
    this.removeFromStore(puzzle.id);
    boardCanvas.discardActiveObject();
    this.putCreatedImage(puzzle, boardCanvas);
  }

  private removeFromStore(puzzleId: string): void {
    this.store.dispatch(returnPuzzle({ id: puzzleId }));
  }

  private removeScalingOptions(img: fabric.Image): void {
    img.lockScalingX = true;
    img.lockScalingY = true;
    img.setControlsVisibility({
      mt: false, mb: false, ml: false, mr: false,
      tl: false, tr: false, bl: false, br: false
    });
  }

  private putCreatedImage(puzzle: Puzzle, boardCanvas: fabric.Canvas): void {
    fabric.Image.fromURL(puzzle.puzzleImageSrc, (img) => {
        (img as ExtendedPuzzle).puzzleData = puzzle;
        img.left = 0;
        img.top = 0;
        this.removeScalingOptions(img);
        img.scaleToWidth((puzzle.width / puzzle.imageCanvasWidth) * puzzle.boardCanvasWidth);
        img.scaleToHeight((puzzle.height / puzzle.imageCanvasHeight) * puzzle.boardCanvasHeight);
        this.puzzleControllerManagerService.registerControllers(this);
        boardCanvas.add(img);               // puts image - puzzle - to canvas
        boardCanvas.setActiveObject(img);   // set focus on inseted image
        img.bringToFront();                 // bring image to front
    });
  }

  public removePuzzleFromBoard(puzzleOnBoard: fabric.Image, boardCanvas: fabric.Canvas): void {
    this.addToStore((puzzleOnBoard as ExtendedPuzzle).puzzleData);
    boardCanvas.remove(puzzleOnBoard);
    boardCanvas.discardActiveObject();
  }

  private addToStore(puzzle: Puzzle): void {
    this.store.dispatch(addPuzzle({ puzzle } ));
  }

  public animatePuzzleLocationOnBoard(puzzleOnBoard: fabric.Image, boardCanvas: fabric.Canvas): void {
    const puzzleData = (puzzleOnBoard as ExtendedPuzzle).puzzleData;
    const topLeftPoint = this.puzzleAreaOnBoardService?.getTopLeftPoint() || { x: 26, y: 26 };
    const circle = this.createCircle(puzzleData.positionLeftOnImage *
      (puzzleData.boardCanvasWidth / puzzleData.imageCanvasWidth) + topLeftPoint.x,
      puzzleData.positionTopOnImage *
      (puzzleData.boardCanvasHeight / puzzleData.imageCanvasHeight) + topLeftPoint.y);
    boardCanvas.add(circle);
    setTimeout(() => this.animateFlow(circle, boardCanvas, puzzleData.width *
      (puzzleData.boardCanvasWidth / puzzleData.imageCanvasWidth)), 100);
  }

  private animateFlow(circle: fabric.Circle, boardCanvas: fabric.Canvas, maxRadius: number): void {
    if (circle.radius !== undefined && circle.radius < maxRadius) {
      boardCanvas.remove(circle);
      circle.radius = circle.radius + 5;
      console.log(circle.radius);
      circle.setCoords();
      circle.calcCoords();
      boardCanvas.add(circle);
      //boardCanvas.renderAll();
      setTimeout(() => this.animateFlow(circle, boardCanvas, maxRadius), 500);
    } else if (circle.radius === undefined) {
      console.log('Error: circle not have radius, cant create animation!');
    }
    console.log('Help animation will go here!');
  }

  public createCircle(
    left: number, top: number,
    width: number = 2,
    color: string = 'transparent',
    selectable: boolean = false): fabric.Circle {
    const circle = new fabric.Circle({
      left,
      top,
      fill: color,
      radius: width,
      stroke: 'red',
      strokeWidth: 3,
      selectable
    });

    return circle;
  }
}
