import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomUtilsService {

  public static randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
