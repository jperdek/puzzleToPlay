import { Component } from '@angular/core';

@Component({
  selector: 'app-aspect-test-node2',
  templateUrl: './aspect-test-node2.component.html',
  styleUrls: ['./aspect-test-node2.component.scss']
})
export class AspectTestNode2Component {

  constructor() { }

  static my(): void {
    console.log('My static method');
  }

  myMethod(): any {
    console.log('My method normal');
    return 1;
  }

  myMethod2(): any {
    console.log('My method before');
    return 1;
  }
}
