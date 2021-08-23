import { ActionReducerMap } from '@ngrx/store';
import * as puzzleState from './puzzles/puzzles.reducer';

export interface PuzzleAppState {
    [puzzleState.puzzlesFeatureKey]: puzzleState.PuzzleToSelectState;
}

export const reducers: ActionReducerMap<PuzzleAppState> = {
    [puzzleState.puzzlesFeatureKey]: puzzleState.reducer,
};

export const puzzleListForSelect = (state: PuzzleAppState): puzzleState.PuzzleToSelectState => state[puzzleState.puzzlesFeatureKey];
