import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as puzzleActions from './puzzles.actions';
import { Puzzle } from './puzzles';

export const puzzlesFeatureKey = 'puzzles';

export interface PuzzleToSelectState extends EntityState<Puzzle> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Puzzle> = createEntityAdapter<Puzzle>();

export const initialState: PuzzleToSelectState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(puzzleActions.loadPuzzles,
    (state, action) => adapter.setAll(action.puzzles, state)
  ),
  on(puzzleActions.addPuzzle,
    (state, action) => adapter.upsertOne(action.puzzle, state)
  ),
  on(puzzleActions.returnPuzzle,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(puzzleActions.returnGivenPuzzles,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(puzzleActions.returnPuzzles,
    (state, action) => adapter.removeAll(state)
  ),
  on(puzzleActions.addPuzzles,
    (state, action) => adapter.upsertMany(action.puzzles, state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
