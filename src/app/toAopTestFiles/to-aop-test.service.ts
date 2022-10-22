import { Injectable } from '@angular/core';
import { strictEqual } from 'assert';
import { aop, hookName, createHook, unAop, hookFor  } from 'to-aop';
import { ToAopManagerGettersSettersService } from './to-aop-manager-getters-setters.service';
import { ToAopManagerInjectService } from './to-aop-manager-inject.service';
import { ToAopManagerService } from './to-aop-manager.service';


class AAA {
  prototype: any;
  constructor() {
    console.log("Creating AAAA");
    return this.applyToMe();
  }
  applyToMe() {
    console.log("Applying!");
    return this;
  }
  a(): any {
    console.log("Previous A!");
  }
}


class BBB {
  constructor() {
    console.log("Creating BBBB");
    //this.a()
  }
  a(): any {
    console.log("THIS IS B");
    return -1;
  }
}

class MovedC {
  static callCFunc(): Function {
    return new C().sampleMethodDecorator(true);
  }
}


class C {
  sampleMethodDecorator(value: boolean): Function {
    console.log("Dercorator function f-----------------------------------------------!!!!");
      console.log(value);
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("<-------------------------- INSIDE");
      console.log(target);
      console.log(propertyKey);
      console.log(descriptor);
      console.log("<-------------------------> ENDS");
    };
  }

  sampleMethodDecorator2(value: boolean): Function {
    console.log("Dercorator function 2");
      console.log(value);
    return function(target: ToAopTestService, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("<-------------------------- INSIDE");
      descriptor.value = function() { console.log("Calling modified f!!!!") }
      console.log(target.f);
      console.log(propertyKey);
      console.log(descriptor);
      console.log("<-------------------------> ENDS");
    };
  }
}

@MovedC.callCFunc()
@Injectable({
  providedIn: 'root'
})
export class ToAopTestService {

  nowBeforeHook: any;
  nowAfterHook: any;
  hookCollection: any;

  nowBeforeConstructorHook: any;
  nowBeforeDynamicHook: any;
  nowBeforeNamedDynamicHook: any;
  hookInjectCollection: any;

  nowBeforeGetterHook: any;
  nowBeforeSetterHook: any;

  constructor(private toAopManagerInject: ToAopManagerInjectService) { }

  @new C().sampleMethodDecorator2(true)
  f() {
    console.log("Calling f!!!!")
  }

  // should be executed only once
  public initialize(): void {
      (this as any).newRuntimeFunction = function() {
          console.log("I am created");
      };
      console.log("Here it goes - function at runtime!");
      (this as any).newRuntimeFunction();
      console.log("Here it ends - function at runtime!");

      console.log("Here it goes - decorator function!");
      this.f(); //not fully overwritten!!!
      console.log("Here it ends - decorator function!");


      console.log('Initializing');

      // STATIC OBJECTS
      this.nowBeforeHook = createHook(hookName.beforeMethod, 'myMethod', (args: any) => {
        console.log('AOP: Before To AOP hook!!!');
      });
      this.nowAfterHook = createHook(hookName.afterMethod, 'myMethod', (args: any) => {
        console.log('AOP: After To AOP hook!!!');
      });
      this.hookCollection = Object.assign({}, this.nowBeforeHook, this.nowAfterHook);
      aop(ToAopManagerService, this.hookCollection); // register


      // DYNAMIC OBJECTS
      // NOT WORKS FOR CONSTRUCTOR
      console.log(AAA.prototype);
      this.nowBeforeConstructorHook = createHook(hookName.aroundMethod, 'applyToMe',  (args: any) => {
        console.log('AOP: Before To AOP constructor hook!!!');
        return new BBB();
      });
      aop(AAA, this.nowBeforeConstructorHook, { constructor: true });
      console.log("CALLING CONSTRUCTTTTTTOOOR!!!!!!");
      var hhh = new AAA();
      hhh.a();

      this.nowBeforeDynamicHook = createHook(hookName.beforeMethod, 'myMethodDynamic', (args: any) => {
        console.log('AOP: Before To AOP dynamic method hook!!!');
      });


      this.nowBeforeNamedDynamicHook = createHook(hookName.beforeMethod, /^(myNamed.*)$/,
      (target: any) => {
        console.log('AOP: Before dynamic method executed!');
        console.log('-----Information start-----');
        if (target !== undefined) {
          console.log('Target');
          console.log(target);
          // console.log(hookFor(target.meta, "5", (args: any) => { console.log("Executing this")}))
        }
        console.log('-----Information end-----');
      });

      // overwrites themselves if are both before methods!!!!
      // this.hookInjectCollection = Object.assign({}, this.nowBeforeNamedDynamicHook, this.nowBeforeDynamicHook);
      // aop(ToAopManagerInjectService, this.hookInjectCollection);

      aop(ToAopManagerInjectService, this.nowBeforeDynamicHook);
      aop(ToAopManagerInjectService, this.nowBeforeNamedDynamicHook);

      // GETTERS AND SETTERS
      this.nowBeforeGetterHook = createHook(hookName.beforeGetter, /.*/, (args: any) => {
        console.log('AOP: Before GETTER To AOP hook!!!');
      });
      this.nowBeforeSetterHook = createHook(hookName.beforeSetter, /.*/, (args: any) => {
        console.log('AOP: Before SETTER To AOP hook!!!');
      });
  }

  public testStaticMethodHook(): void {
    ToAopManagerService.myMethod();
    const a = new ToAopManagerInjectService();
    a.myMethodDynamic();
    a.myNamed1();
    a.myNamed2();
    a.myNamed3(5);
    a.my2Named();

    const b = new ToAopManagerGettersSettersService();
    aop(b, this.nowBeforeGetterHook);
    aop(b, this.nowBeforeSetterHook);
    b.myVariable = 5;
    //b.myVariable1(14);
    console.log('Printing my variable: ' + b.myVariable.toString());
  }

  public removeAop(): void {
    unAop(ToAopManagerService); // removes only one aop hook - hook collection should be used due to it!
    unAop(ToAopManagerInjectService);
  }

}

