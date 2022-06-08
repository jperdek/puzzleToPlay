import { Injectable } from '@angular/core';
import { before } from 'aspectjs';
import { AspectTestNode2Component } from './aspect-test-node2/aspect-test-node2.component';

@Injectable({
  providedIn: 'root'
})
export class AspectjsManagerService {

  constructor(private aspectNode2: AspectTestNode2Component) {  before(this.aspectNode2, 'myMethod').add(this, 'myMethodService'); }

  myMethodService(): void {
    console.log('Executed before in a service!');
  }
}
