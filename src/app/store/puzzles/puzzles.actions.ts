import { createAction, props } from '@ngrx/store';
import { Puzzle } from './puzzles';

export const loadPuzzles = createAction(
  '[Puzzles] Load Puzzles',
  props<{ puzzles: Puzzle[]}>()
);

export const addPuzzle = createAction(
  '[Puzzle] Add Puzzles',
  props<{ puzzle: Puzzle }>()
);

export const returnPuzzle = createAction(
  '[Puzzles] Return Puzzles',
  props<{ id: string }>()
);

export const returnGivenPuzzles = createAction(
  '[Puzzles] ReturnMany Puzzles',
  props<{ ids: string[] }>()
);

export const returnPuzzles = createAction(
  '[Puzzles] ReturnAll Puzzles',
);

export const addPuzzles = createAction(
  '[Puzzles] AddMany Puzzles',
  props<{ puzzles: Puzzle[] }>()
);
