import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';
import { ShufflePuzzlesService } from 'src/app/services/utils/shuffle-puzzles.service';
import { PuzzleAppState, puzzleListForSelect } from 'src/app/store';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import * as puzzleState from 'src/app/store/puzzles/puzzles.reducer';

@Component({
  selector: 'app-puzzle-chooser',
  templateUrl: './puzzle-chooser.component.html',
  styleUrls: ['./puzzle-chooser.component.scss']
})
export class PuzzleChooserComponent {

  shuffled = true;

  constructor(
    private store: Store<PuzzleAppState>,
    private puzzleManager: PuzzleManagerService) { }

  public getPuzzles(): Observable<Puzzle[]> {
    return this.store.pipe(select(puzzleListForSelect), select(puzzleState.selectAll));
  }

  public addToBoard(puzzle: Puzzle): void {
    this.puzzleManager.addPuzzleToBoard(puzzle);
  }

  public getCSSRotateString(angle: number): string {
    return 'transform: rotate(' + angle.toString() + 'deg)';
  }
}
