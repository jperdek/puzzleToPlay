import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { ExtendedPuzzle } from 'src/app/models/extendedPuzzle';
import { Point } from 'src/app/models/point';

@Injectable({
  providedIn: 'root'
})
export class SetPuzzleAreaOnBoardService {

  margin = 16;
  strokeWidth =  10;
  dashSpace = 2;
  strokeDashArray = [10, this.dashSpace];
  strokeColor = '#8B008B';

  constructor() { }


  public getTopLeftPoint(): Point {
    return { x: this.margin + this.strokeWidth, y: this.margin + this.strokeWidth };
  }

  public getPlayableWidth(boardWidth: number): number {
    return boardWidth - 2 * this.strokeWidth - 2 * this.margin;
  }

  public getPlayableHeight(boardHeight: number): number {
    return boardHeight - 2 * this.strokeWidth - 2 * this.margin;
  }

  public drawBoard(
    playBoardWidth: number, playBoardHeight: number,
    puzzleBoard: fabric.Canvas): void {
    const newBoardWidth = playBoardWidth + this.strokeWidth;
    const newBoardHeight = playBoardHeight + this.strokeWidth;
    const newBoardLeft = this.margin;
    const newBoardTop = this.margin;
    this.createPuzzlePlayableRect(newBoardLeft, newBoardTop, newBoardWidth, newBoardHeight, puzzleBoard);

    console.log(puzzleBoard.getWidth());
    if (puzzleBoard.getWidth() > 790) {
      console.log('Here');
      this.setDesignImage(puzzleBoard, '/assets/designImages/puzzleBoard3.svg');
    } else {
      this.setDesignImage(puzzleBoard, '/assets/designImages/puzzleBoard2.svg');
    }
  }

  public createPuzzlePlayableRect(
    left: number, top: number,
    width: number, height: number,
    puzzleBoard: fabric.Canvas): void {
    const bottomHeightPart = top + height;
    const leftWidthPart = left + width;
    // top border
    this.createDashLine([left + this.strokeWidth + this.dashSpace, top, leftWidthPart + this.strokeWidth, top],
      left + this.strokeWidth + this.dashSpace, top, this.strokeDashArray, this.strokeColor, this.strokeWidth, puzzleBoard);

    // right border
    this.createDashLine([leftWidthPart, top + this.strokeWidth + this.dashSpace, leftWidthPart, bottomHeightPart + this.strokeWidth],
      leftWidthPart, top + this.strokeWidth + this.dashSpace, this.strokeDashArray, this.strokeColor, this.strokeWidth, puzzleBoard);

    // left border
    this.createDashLine([left, top, left, bottomHeightPart - this.dashSpace],
      left, top, this.strokeDashArray, this.strokeColor, this.strokeWidth, puzzleBoard);

    // bottom border
    this.createDashLine([left, bottomHeightPart, leftWidthPart - this.dashSpace, bottomHeightPart],
      left, bottomHeightPart, this.strokeDashArray, this.strokeColor, this.strokeWidth, puzzleBoard);
    puzzleBoard.renderAll();
  }

  public createDashLine(
    lineCoordinates: number[],
    left: number, top: number,
    strokeDashArray: number[],
    strokeColor: string,
    strokeWidth: number,
    puzzleBoard: fabric.Canvas,
    selectable: boolean = false,
    puzzleBoardPart: boolean = true): fabric.Line {
    const dashedLine = new fabric.Line(lineCoordinates, {
      left,
      top,
      strokeDashArray,
      stroke: strokeColor,
      strokeWidth,
      selectable
    });

    if (puzzleBoardPart) {
      dashedLine.sendToBack();
    }

    this.setPreviousValues(dashedLine as unknown as ExtendedPuzzle, puzzleBoard);
    puzzleBoard.add(dashedLine);
    return dashedLine;
  }

  public setDesignImage(
    puzzleBoard: fabric.Canvas,
    designImagePath: string): void{
    fabric.Image.fromURL(designImagePath, (img: fabric.Image) => {
      img.scaleToWidth(puzzleBoard.getWidth());
      img.scaleToHeight(puzzleBoard.getHeight());
      puzzleBoard.setBackgroundImage(img, puzzleBoard.renderAll.bind(puzzleBoard), {
        opacity: 0.3
      });
    });
  }

  public setPreviousValues(dashedLine: ExtendedPuzzle, puzzleBoard: fabric.Canvas): ExtendedPuzzle {
    dashedLine.previousCanvasWidth = puzzleBoard.getWidth();
    dashedLine.previousCanvasHeight = puzzleBoard.getHeight();
    return dashedLine;
  }

  public cleanBoardAll(puzzleBoard: fabric.Canvas): void {
    puzzleBoard.clear();
  }

  public cleanBoardObjectsOnly(puzzleBoard: fabric.Canvas): void {
    puzzleBoard.getObjects().filter((object: fabric.Object) => object.selectable === false).forEach(boardObject => {
      puzzleBoard.remove(boardObject);
    });
  }
}
