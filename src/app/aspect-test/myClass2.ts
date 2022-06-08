import { Component, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {beforeMethod, Metadata} from 'aspect.js';
import {Wove} from 'aspect.js-angular';
import { Bar1 } from './myClass';

class AspectTest22 {

    @beforeMethod({
      classes: [Bar1],
      methods: [Bar1.prototype.baz]
    })
    logger(meta: Metadata) {
      console.log("This is usage!!!!");
    }

    constructor() {
      console.log("Creating");
    }
}
