import { Component } from '@angular/core';
//const before1 = require('aspectjs').before;
import { before } from 'aspectjs';

@Component({
  selector: 'app-aspect-test-node',
  templateUrl: './aspect-test-node.component.html',
  styleUrls: ['./aspect-test-node.component.scss']
})
export class AspectTestNodeComponent {

  constructor() { before(this, 'myMethod').add(this, 'myMethod2'); }

  myMethod(): any {
    console.log('My method after');
    return 1;
  }

  myMethod2(): any {
    console.log('My method before');
    return 1;
  }
}
