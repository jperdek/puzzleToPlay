import { Component, OnInit } from '@angular/core';
import { aop, hookName, createHook } from 'to-aop';

@Component({
  selector: 'app-to-aop-test',
  templateUrl: './to-aop-test.component.html',
  styleUrls: ['./to-aop-test.component.scss']
})
export class ToAopTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
