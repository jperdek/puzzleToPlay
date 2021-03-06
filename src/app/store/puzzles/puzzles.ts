export interface Puzzle {
    id: string;
    positionIndex: number;
    puzzleImageSrc: string;
    width: number; height: number;
    rotateAngle: number;
    positionLeftOnImage: number;  positionTopOnImage: number;
    boardCanvasWidth: number; boardCanvasHeight: number;
    imageCanvasWidth: number; imageCanvasHeight: number;
}
