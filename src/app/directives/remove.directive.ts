import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRemove]'
})
export class RemoveDirective {

  constructor(element: ElementRef) {
    console.log('HEEEEERE');
    element.nativeElement.addEventListener('click', () => {
      element.nativeElement.remove();
   });
  }
}
