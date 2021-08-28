import { Injectable } from '@angular/core';
import { Puzzle } from 'src/app/store/puzzles/puzzles';

@Injectable({
  providedIn: 'root'
})
export class ShufflePuzzlesService {

  constructor() { }


  // -> Fisher–Yates shuffle algorithm
public shuffleArray(array: Array<Puzzle>): Array<Puzzle> {
    let m = array.length;
    let t;
    let i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
