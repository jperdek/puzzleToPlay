import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PuzzleAppState, puzzleListForSelect } from 'src/app/store';
import { Puzzle } from 'src/app/store/puzzles/puzzles';
import * as puzzleState from 'src/app/store/puzzles/puzzles.reducer';

@Component({
  selector: 'app-puzzle-chooser',
  templateUrl: './puzzle-chooser.component.html',
  styleUrls: ['./puzzle-chooser.component.scss']
})
export class PuzzleChooserComponent implements OnInit {

  constructor(private store: Store<PuzzleAppState>) { }

  ngOnInit(): void {
  }

  public getPuzzles(): Observable<Puzzle[]> {
    return this.store.pipe(select(puzzleListForSelect), select(puzzleState.selectAll));
  }
}
