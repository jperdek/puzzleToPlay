import { Component } from '@angular/core';
import { PuzzleManagerService } from '../../../services/puzzle-manager.service';

@Component({
  selector: 'app-puzzle-board',
  templateUrl: './puzzle-board.component.html',
  styleUrls: ['./puzzle-board.component.scss'],
})
export class PuzzleBoardComponent {

  constructor(private puzzleManager: PuzzleManagerService) {}

  public initialize(): void {
    this.puzzleManager.initialize();
  }
}
