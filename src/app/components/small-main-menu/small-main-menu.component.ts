import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InsertTemplateImageBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/insert-template-image-bottom-sheet/insert-template-image-bottom-sheet.component';
import { PuzzleChooserBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/puzzle-chooser-bottom-sheet/puzzle-chooser-bottom-sheet.component';
import { TemplatePreviewBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/template-preview-bottom-sheet/template-preview-bottom-sheet.component';

@Component({
  selector: 'app-small-main-menu',
  templateUrl: './small-main-menu.component.html',
  styleUrls: ['./small-main-menu.component.scss']
})
export class SmallMainMenuComponent {

  constructor(private bottomSheet: MatBottomSheet) {}


  public openInsertTemplateImageBottomSheet(): void {
    this.bottomSheet.open(InsertTemplateImageBottomSheetComponent);
  }

  public openPuzzleChooserBottomSheet(): void {
    this.bottomSheet.open(PuzzleChooserBottomSheetComponent);
  }

  public openTemplatePreviewBottomSheet(): void {
    this.bottomSheet.open(TemplatePreviewBottomSheetComponent);
  }
}
