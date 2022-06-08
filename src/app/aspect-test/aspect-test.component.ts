import { Component, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {beforeMethod, Metadata} from 'aspect.js';
import {Wove} from 'aspect.js-angular';
import { Bar1 } from './myClass';

@Component({
  selector: 'app-aspect-test',
  templateUrl: './aspect-test.component.html',
  styleUrls: ['./aspect-test.component.scss']
})
export class AspectTestComponent {

  @beforeMethod({
    classes: [Bar1],
    methods: [Bar1.prototype.baz]
  })
  logger(meta: Metadata) {
    console.log("This is usage!!!!");
  }

}
