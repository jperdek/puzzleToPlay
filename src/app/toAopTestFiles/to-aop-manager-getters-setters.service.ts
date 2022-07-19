import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToAopManagerGettersSettersService {

  myVariable = 5;

  constructor() { }

  set myVariable1(myVariable: number) {
    this.myVariable = myVariable;
  }

  get myVariable1(): number {
    return this.myVariable;
  }
}
