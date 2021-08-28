import { Injectable } from '@angular/core';
import { Point } from 'src/app/models/point';
import { ExtendedPuzzle } from '../../models/extendedPuzzle';
import { PuzzleManagerService } from '../puzzleGenerator/puzzle-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ManipulationHandlerService {

  constructor() { }

  public registerCanvasOnManipulationEvents(puzzleBoard: fabric.Canvas, puzzleManagerService: PuzzleManagerService): void {
    this.processDraggingOnMouseDown(puzzleBoard, puzzleManagerService);
    this.processDraggingOnMouseUp(puzzleBoard, puzzleManagerService);
  }

  public processDraggingOnMouseDown(puzzleBoard: fabric.Canvas, puzzleManagerService: PuzzleManagerService): void {
    puzzleBoard.on('mouse:down',  (event: fabric.IEvent) => {
      if (event.target !== null && event.target !== undefined) {
        // saves pozition of cursor on the begining of manipulation
        (event.target as ExtendedPuzzle).dragPointer = event.pointer;
      }

      this.setPositionForZooming(event.pointer, puzzleManagerService);
    });
  }

  public processDraggingOnMouseUp(puzzleBoard: fabric.Canvas, puzzleManagerService: PuzzleManagerService): void {
    puzzleBoard.on('mouse:up',  (event: fabric.IEvent) => {
      const puzzle = event.target;
      if (puzzle !== null) { // puzzle or puzzles otherwise ends
        const dragPointer = (event.target as ExtendedPuzzle).dragPointer;
        const pointer = event.pointer;
        const interBoardSize = puzzleManagerService.getSizeAccordingAspectRatio();
        // if puzzle not exists
        if (puzzle  === undefined) { return; }

        if (dragPointer !== undefined) {
          if (puzzle !== undefined && !('_objects' in puzzle)) {
            if (dragPointer.x !== pointer?.x || dragPointer.y !== pointer?.y) {
              this.saveForResize(puzzleBoard, puzzle as ExtendedPuzzle, interBoardSize.x, interBoardSize.y);
              return; // stop event handler
            }
          } else if (puzzle !== undefined && '_objects' in puzzle) {
            if (dragPointer.x !== pointer?.x || dragPointer.y !== pointer?.y) {
                (puzzle as unknown as fabric.Canvas)._objects.forEach((source) => {
                    this.saveForResize(puzzleBoard, source as ExtendedPuzzle, interBoardSize.x, interBoardSize.y);
                });
                puzzleBoard.setActiveObject(puzzle);
                return;
            }
          }
        }
      }
    });
  }

  public saveForResize(puzzleBoard: fabric.Canvas, puzzle: ExtendedPuzzle,
                       playBoardWidth: number, playBoardHeight: number): void {
    const activeObjects = puzzleBoard.getActiveObject();
    puzzleBoard.remove(puzzle);
    puzzle.previousCanvasWidth = playBoardWidth;
    puzzle.previousCanvasHeight = playBoardHeight;
    puzzleBoard.add(puzzle);
    puzzleBoard.setActiveObject(activeObjects);
  }

  private setPositionForZooming(cursorPoint: Point | undefined, puzzleManagerService: PuzzleManagerService): void {
    if (cursorPoint !== undefined) {
      const zoomManagerService = puzzleManagerService.getZoomManagerService();
      zoomManagerService.setZoomPosition(cursorPoint.x, cursorPoint.y);
    } else {
      console.log('Error: cursor point is undefined! Cant set position for zooming!');
    }
  }
}
