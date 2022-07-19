import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AspectTestComponent } from 'src/app/aspect-test/aspect-test.component';
import { Bar } from 'src/app/bar.service';
import { ImagesToPuzzleMock } from 'src/app/mockups/gallery.mock';
import { TemplateImage } from 'src/app/models/defaultTemplates';
import { PuzzleManagerService } from 'src/app/services/puzzleGenerator/puzzle-manager.service';
import {beforeMethod, Metadata} from 'aspect.js';
import { Bar1 } from 'src/app/aspect-test/myClass';
import { AspectTestNodeComponent } from 'src/app/aspect-test-node/aspect-test-node.component';
import { AspectjsManagerService } from 'src/app/aspectjs-manager.service';
import { AspectTestNode2Component } from 'src/app/aspect-test-node2/aspect-test-node2.component';
import { before } from 'aspectjs';
import { ToAopTestService } from 'src/app/toAopTestFiles/to-aop-test.service';



@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  constructor(
    private puzzleManagerService: PuzzleManagerService,
    private toAopTestService: ToAopTestService,
    private router: Router
    // private bar: Bar
    ) {}

  ngOnInit(): void {
    this.toAopTestService.initialize();
  }

  public getSlides(): Observable<TemplateImage[]> {
    return of(ImagesToPuzzleMock);
  }

  public createPuzzleForImage(slide: TemplateImage): void {
    console.log('HEre');
    this.router.navigateByUrl('/puzzle/selectPuzzles');
    // its in another module which needs to be loaded first
    setTimeout(() => this.puzzleManagerService.startGame(slide.src), 700);
  }

  public neMethod(): void {
    /// case 1 - constructor not work / its type only
    before(AspectTestNode2Component, 'constructor').add(this, 'myTestMethod2'); // can be added inside component / service in ngOnInit
    // before(AspectTestNode2Component, 'myMethod').add(this, 'myTestMethod2'); // error

    /// CASE 2 - inside components - dynamically
    let method = new AspectTestNodeComponent();
    method.myMethod();

    /// CASE 3 - inside services - dynamically
    const aspectTestComponent = new AspectTestNode2Component();
    const service = new AspectjsManagerService(aspectTestComponent);
    aspectTestComponent.myMethod();

    /// case 4 - static methods
    before(AspectTestNode2Component, 'my').add(this, 'myTestMethod');
    AspectTestNode2Component.my();

    this.startToAopTest();
  }

  public removeAop(): void {
    console.log('Removing AOP!');
    this.toAopTestService.removeAop();
  }

  startToAopTest(): void {
    this.toAopTestService.testStaticMethodHook();
  }

  myTestMethod(): void {
    console.log('This is my test method');
  }

  myTestMethod2(): void {
    console.log('This is my test2 method');
  }
}
