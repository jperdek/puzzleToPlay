import { Injectable } from '@angular/core';
import { Wove } from 'aspect.js-angular/wove';
import 'reflect-metadata';

@Wove()
@Injectable({
  providedIn: 'root'
})
export class Bar {
  constructor() {
    console.log("Creating");
  }

  baz() {
    console.log("There");
    // method content
  }
}
