import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, ofType, createEffect } from '@ngrx/effects';
import { loadPuzzles } from '../store/puzzles/puzzles.actions';
import { map } from 'rxjs/operators';
import { PuzzleMock } from '../mockups/puzzle.mock';


@Injectable()
export class AppEffects {

  constructor(private actions$: Actions) { }

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(_ => loadPuzzles({ puzzles: PuzzleMock }))));
}
