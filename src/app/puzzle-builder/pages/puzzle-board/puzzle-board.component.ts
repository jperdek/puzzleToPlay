import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';


@Component({
  selector: 'app-puzzle-board',
  templateUrl: './puzzle-board.component.html',
  styleUrls: ['./puzzle-board.component.scss'],
})
export class PuzzleBoardComponent implements AfterViewInit {

  constructor(private puzzleManager: PuzzleManagerService) { }

  @ViewChild('puzzleBoard') canvas?: ElementRef;

  public ngAfterViewInit(): void {
    this.initialize();
  }

  public initialize(): void {
    this.puzzleManager.initialize();
  }
}
