import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-puzzle-chooser-bottom-sheet',
  templateUrl: './puzzle-chooser-bottom-sheet.component.html',
  styleUrls: ['./puzzle-chooser-bottom-sheet.component.scss']
})
export class PuzzleChooserBottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<PuzzleChooserBottomSheetComponent>) {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
