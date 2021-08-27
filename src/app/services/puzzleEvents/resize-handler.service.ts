import { Injectable } from '@angular/core';
import { ExtendedPuzzle } from 'src/app/models/extendedPuzzle';
import { ImageSizeManagerService } from '../puzzleGenerator/image-size-manager.service';
import { SetPuzzleAreaOnBoardService } from '../puzzleGenerator/set-puzzle-area-on-board.service';


@Injectable({
  providedIn: 'root'
})
export class ResizeHandlerService {

  constructor(private imageSizeManagerService: ImageSizeManagerService) { }

  public registerResizeHandler(puzzleBoard: fabric.Canvas,
                               setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService,
                               baseImageAspectRatio: number,
                               puzzleBoardWrapperId: string = 'puzzleBoardWrapper'): void {

    window.addEventListener('resize', () => {

      setPuzzleAreaOnBoardService.cleanBoardObjectsOnly(puzzleBoard);
      this.fitCanvasToMaxSize(puzzleBoard, puzzleBoardWrapperId);

      const interBoardSize = this.imageSizeManagerService.getSizeAccordingAspectRatio(
        setPuzzleAreaOnBoardService.getPlayableWidth(puzzleBoard.getWidth()),
        setPuzzleAreaOnBoardService.getPlayableHeight(puzzleBoard.getHeight()),
        baseImageAspectRatio);
      setPuzzleAreaOnBoardService.drawBoard(interBoardSize.x, interBoardSize.y, puzzleBoard);
      this.applyResizeOnPuzzles(puzzleBoard, interBoardSize.x, interBoardSize.y, setPuzzleAreaOnBoardService);
      puzzleBoard.requestRenderAll();
    });
  }

  public fitCanvasToMaxSize(puzzleBoard: fabric.Canvas, puzzleBoardWrapperId: string = 'puzzleBoardWrapper'): void {
    const puzzleBoardWrapperDiv = document.getElementById(puzzleBoardWrapperId) as HTMLDivElement;
    if (puzzleBoardWrapperDiv !== null){
      puzzleBoard.setWidth(puzzleBoardWrapperDiv.offsetWidth);
      puzzleBoard.setHeight(puzzleBoardWrapperDiv.offsetHeight);
    } else {
      console.log('Error: canvas wrapper element not found - cant initialize canvas!');
    }
  }

  public applyResizeOnPuzzles(puzzleBoard: fabric.Canvas,
                              playBoardWidth: number, playBoardHeight: number,
                              setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService): void {
    puzzleBoard.getObjects()
      .filter(boardObject => boardObject.selectable)
      .forEach((puzzle: fabric.Object) => {

        const boardPuzzle = puzzle as ExtendedPuzzle;
        if (boardPuzzle.previousCanvasWidth !== undefined && boardPuzzle.previousCanvasHeight !== undefined) {
          const scaleRatioWidth = (playBoardWidth / boardPuzzle.previousCanvasWidth);
          const scaleRatioHeight = (playBoardHeight / boardPuzzle.previousCanvasHeight);

          this.applySizeForPuzzle(boardPuzzle, scaleRatioWidth, scaleRatioHeight, setPuzzleAreaOnBoardService);
        } else {
          console.log('Error: error during resizing puzzle, previous board size is undefined!');
        }

        this.setPreviousObjectAttributes(boardPuzzle, playBoardWidth, playBoardHeight);
        boardPuzzle.setCoords();
        boardPuzzle.calcCoords();
      });
  }


  private setPreviousObjectAttributes(boardPuzzle: ExtendedPuzzle,
                                      playBoardWidth: number, playBoardHeight: number): void {
    boardPuzzle.previousCanvasWidth = playBoardWidth;
    boardPuzzle.previousCanvasHeight = playBoardHeight;
  }

  private applySizeForPuzzle(
    boardPuzzle: ExtendedPuzzle,
    scaleRatioWidth: number,
    scaleRatioHeight: number,
    setPuzzleAreaOnBoardService: SetPuzzleAreaOnBoardService): void {
    if (boardPuzzle.width !== undefined && boardPuzzle.height !== undefined) {
      if (boardPuzzle.scaleX !== undefined && boardPuzzle.scaleY !== undefined){
        boardPuzzle.set({
          scaleX: boardPuzzle.scaleX * scaleRatioWidth,
          scaleY: boardPuzzle.scaleY * scaleRatioHeight});
      }

      if (boardPuzzle.left !== undefined && boardPuzzle.top !== undefined) {
        const margin = setPuzzleAreaOnBoardService.getTopLeftPoint();
        boardPuzzle.set({
          left: (boardPuzzle.left - margin.x) * scaleRatioWidth + margin.x,
          top: (boardPuzzle.top - margin.y) * scaleRatioHeight + margin.y,
        });
      } else {
        console.log('Error: top and left are undefined!');
      }
    } else {
      console.log('Error: scaleX or scaleX of puzzle are undefined!');
    }
  }
}
