import { fabric } from 'fabric';
import { Puzzle } from '../store/puzzles/puzzles';

export interface ExtendedPuzzle extends fabric.Image {
    puzzleData: Puzzle;
}
