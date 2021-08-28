import { Component } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ZoomManagementInterface } from 'src/app/models/zoomManagementInterface';
import { ZoomManagerService } from 'src/app/services/puzzleEvents/zoom-manager.service';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';

@Component({
  selector: 'app-zoom-management',
  templateUrl: './zoom-management.component.html',
  styleUrls: ['./zoom-management.component.scss']
})
export class ZoomManagementComponent implements ZoomManagementInterface {

  centerX = 25;
  centerY = 25;
  zoomValue = 1.0;
  zoomManagerService: ZoomManagerService;

  constructor(private puzzleManagerService: PuzzleManagerService) {
    this.zoomManagerService = puzzleManagerService.getZoomManagerService();
    this.zoomManagerService.initForComponent(this);
  }

  public setCenterXAndY(x: number, y: number): void {
    this.centerX = x;
    this.centerY = y;
  }

  public setZoom(): void {
    const puzzleBoard = this.puzzleManagerService.getPuzzleBoard();
    this.zoomManagerService.zoomToPointWithZoom(this.centerX, this.centerY, puzzleBoard, this.zoomValue);
  }

  public setZoomFromDefaultToPoint(): void {
    this.applyZoomReset();
    const puzzleBoard = this.puzzleManagerService.getPuzzleBoard();
    this.zoomManagerService.zoomToPointWithZoom(this.centerX, this.centerY, puzzleBoard, this.zoomValue);
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

  public toggleZoom($event: MatSlideToggleChange): void {
    if ($event.checked) {
      const zoomContents = document.getElementsByClassName('zoom-content');
      Array.from(zoomContents).forEach(zoomContentDiv => zoomContentDiv.classList.add('hide-zoom-content'));
    } else {
      const zoomContents = document.getElementsByClassName('zoom-content');
      Array.from(zoomContents).forEach(zoomContentDiv => zoomContentDiv.classList.remove('hide-zoom-content'));
    }
  }
}
