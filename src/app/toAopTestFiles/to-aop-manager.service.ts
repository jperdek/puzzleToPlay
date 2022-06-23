import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToAopManagerService {

  constructor() { }

  public static myMethod(): void {
    console.log('This and thet from AOP manager');
  }
}
