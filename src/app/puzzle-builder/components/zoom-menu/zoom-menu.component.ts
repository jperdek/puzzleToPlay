import { Component } from '@angular/core';
import { ZoomManagementInterface } from 'src/app/models/zoomManagementInterface';
import { ZoomManagerService } from 'src/app/services/puzzleEvents/zoom-manager.service';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';

@Component({
  selector: 'app-zoom-menu',
  templateUrl: './zoom-menu.component.html',
  styleUrls: ['./zoom-menu.component.scss']
})
export class ZoomMenuComponent implements ZoomManagementInterface{

  centerX = 25;
  centerY = 25;
  zoomValue = 1.0;
  zoomManagerService: ZoomManagerService;

  constructor(private puzzleManagerService: PuzzleManagerService) {
    this.zoomManagerService = puzzleManagerService.getZoomManagerService();
    this.zoomManagerService.initForComponent(this);
  }

  public applyZoomIn(): void {
    const puzzleBoard = this.puzzleManagerService.getPuzzleBoard();
    this.zoomManagerService.zoomToPoint(this.centerX, this.centerY, puzzleBoard, -125);
  }

  public applyZoomOut(): void {
    const puzzleBoard = this.puzzleManagerService.getPuzzleBoard();
    this.zoomManagerService.zoomToPoint(this.centerX, this.centerY, puzzleBoard, +125);
  }

  public applyZoomReset(): void {
    const puzzleBoard = this.puzzleManagerService.getPuzzleBoard();
    this.zoomManagerService.resetZoom(puzzleBoard);
  }

  public setCenterXAndY(x: number, y: number): void {
    this.centerX = x;
    this.centerY = y;
    console.log('HERE');
  }

}
