import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-insert-template-image-bottom-sheet',
  templateUrl: './insert-template-image-bottom-sheet.component.html',
  styleUrls: ['./insert-template-image-bottom-sheet.component.scss']
})
export class InsertTemplateImageBottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<InsertTemplateImageBottomSheetComponent>) {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
