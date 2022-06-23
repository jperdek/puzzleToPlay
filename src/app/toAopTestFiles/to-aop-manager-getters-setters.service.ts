import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToAopManagerGettersSettersService {

  myVariable = 5;

  constructor() { }

  set myVariable1(myVariable: number): void {
    this.myVariable = myVariable;
  }

  get myVariable(): number {
    return this.myVariable;
  }
}
