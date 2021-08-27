import { fabric } from 'fabric';
import { Puzzle } from '../store/puzzles/puzzles';

export interface ExtendedPuzzle extends fabric.Image {
    puzzleData: Puzzle;

    dragPointer: fabric.Point | undefined;

    // for responsiveness
    previousCanvasWidth: number | undefined;
    previousCanvasHeight: number | undefined;
}
