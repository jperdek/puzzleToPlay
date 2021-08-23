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

export const deleteCanvasEntity = createAction(
  '[Puzzles] Delete Puzzles',
  props<{ id: string }>()
);

export const deleteGivenPuzzles = createAction(
  '[Puzzles] DeleteMany Puzzles',
  props<{ ids: string[] }>()
);

export const deletePuzzles = createAction(
  '[Puzzles] DeleteAll Puzzles',
);

export const addPuzzles = createAction(
  '[Puzzles] AddMany Puzzles',
  props<{ puzzles: Puzzle[] }>()
);
