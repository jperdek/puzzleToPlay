import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-zoom-management-bottom-sheet',
  templateUrl: './zoom-management-bottom-sheet.component.html',
  styleUrls: ['./zoom-management-bottom-sheet.component.scss']
})
export class ZoomManagementBottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<ZoomManagementBottomSheetComponent>) {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
