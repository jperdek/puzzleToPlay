import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {

  constructor() { }

  public toggleZoom($event: MatSlideToggleChange): void {
    if ($event.checked) {
      const zoomContents = document.getElementsByClassName('zoom-content');
      Array.from(zoomContents).forEach(zoomContentDiv => zoomContentDiv.classList.add('hide-zoom-content'));
    } else {
      const zoomContents = document.getElementsByClassName('zoom-content');
      Array.from(zoomContents).forEach(zoomContentDiv => zoomContentDiv.classList.remove('hide-zoom-content'));
    }
  }
}
