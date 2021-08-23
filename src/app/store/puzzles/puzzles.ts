export interface Puzzle {
    id: string;
    positionIndex: number;
    puzzleImageSrc: string;
    width: number; height: number;
    boardCanvasWidth: number; boardCanvasHeight: number;
    imageCanvasWidth: number; imageCanvasHeight: number;
}
