import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fabric } from 'fabric';
import { ExtendedPuzzle } from 'src/app/models/extendedPuzzle';
import { PuzzleAppState } from 'src/app/store';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import { addPuzzle, returnPuzzle } from 'src/app/store/puzzles/puzzles.actions';
import { PuzzleControllerManagerService } from '../puzzleControllers/puzzle-controller-manager.service';


@Injectable({
  providedIn: 'root'
})
export class ManagePuzzleService {

  constructor(
    private store: Store<PuzzleAppState>,
    private puzzleControllerManagerService: PuzzleControllerManagerService) { }

  public addPuzzleToBoard(puzzle: Puzzle, boardCanvas: fabric.Canvas): void {
    this.removeFromStore(puzzle.id);
    this.putCreatedImage(puzzle, boardCanvas);
  }

  private removeFromStore(puzzleId: string): void {
    this.store.dispatch(returnPuzzle({ id: puzzleId }));
  }

  private putCreatedImage(puzzle: Puzzle, boardCanvas: fabric.Canvas): void {
    fabric.Image.fromURL(puzzle.puzzleImageSrc, (img) => {
        (img as ExtendedPuzzle).puzzleData = puzzle;
        img.left = 0;
        img.top = 0;
        img.scaleToWidth((puzzle.width / puzzle.imageCanvasWidth) * puzzle.boardCanvasWidth);
        img.scaleToHeight((puzzle.height / puzzle.imageCanvasHeight) * puzzle.boardCanvasHeight);
        this.puzzleControllerManagerService.registerControllers(this);
        boardCanvas.add(img);
        img.bringToFront();
    });
  }

  public removePuzzleFromBoard(puzzleOnBoard: fabric.Image, boardCanvas: fabric.Canvas): void {
    this.addToStore((puzzleOnBoard as ExtendedPuzzle).puzzleData);
    boardCanvas.remove(puzzleOnBoard);
  }

  private addToStore(puzzle: Puzzle): void {
    this.store.dispatch(addPuzzle({ puzzle } ));
  }

  public animatePuzzleLocationOnBoard(puzzleOnBoard: fabric.Image, boardCanvas: fabric.Canvas): void {
    const puzzleData = (puzzleOnBoard as ExtendedPuzzle).puzzleData;
    setTimeout(() => this.animateFlow(), 100);
  }

  private animateFlow(): void {
    console.log('Help animation will go here!');
  }
}
