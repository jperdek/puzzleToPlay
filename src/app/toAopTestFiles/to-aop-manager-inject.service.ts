import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToAopManagerInjectService {

  constructor() { console.log('Constructor called!'); }

  public myMethodDynamic(): void {
    console.log('Dynamic method called!');
  }

  public myNamed1(): void {
    console.log('Method named 1!');
  }

  public myNamed2(): void {
    console.log('Method named 2!');
  }

  public myNamed3(numericParam: number): void {
    console.log('Method named 3!' + numericParam.toString());
  }

  public my2Named(): void {
    console.log('Method named differently.');
  }
}
