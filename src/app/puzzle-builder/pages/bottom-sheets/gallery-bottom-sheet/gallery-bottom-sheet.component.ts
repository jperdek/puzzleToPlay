import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-gallery-bottom-sheet',
  templateUrl: './gallery-bottom-sheet.component.html',
  styleUrls: ['./gallery-bottom-sheet.component.scss']
})
export class GalleryBottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<GalleryBottomSheetComponent>) {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
