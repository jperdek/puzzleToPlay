import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { GalleryBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/gallery-bottom-sheet/gallery-bottom-sheet.component';
import { InsertTemplateImageBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/insert-template-image-bottom-sheet/insert-template-image-bottom-sheet.component';
import { PuzzleChooserBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/puzzle-chooser-bottom-sheet/puzzle-chooser-bottom-sheet.component';
import { TemplatePreviewBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/template-preview-bottom-sheet/template-preview-bottom-sheet.component';
import { ZoomManagementBottomSheetComponent } from 'src/app/puzzle-builder/pages/bottom-sheets/zoom-management-bottom-sheet/zoom-management-bottom-sheet.component';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router) { }

  public toggleZoom($event: MatSlideToggleChange): void {
    if ($event.checked) {
      const zoomContents = document.getElementsByClassName('zoom-content');
      Array.from(zoomContents).forEach(zoomContentDiv => zoomContentDiv.classList.add('hide-zoom-content'));
    } else {
      const zoomContents = document.getElementsByClassName('zoom-content');
      Array.from(zoomContents).forEach(zoomContentDiv => zoomContentDiv.classList.remove('hide-zoom-content'));
    }
  }

  public loadingFromOtherModuleFix(): void {
    if (this.router.url.indexOf('/puzzle/') === -1) {
      this.router.navigateByUrl('/puzzle');
    }
  }

  public openInsertTemplateImageBottomSheet(): void {
    this.loadingFromOtherModuleFix();
    this.bottomSheet.open(InsertTemplateImageBottomSheetComponent);
  }

  public openPuzzleChooserBottomSheet(): void {
    this.loadingFromOtherModuleFix();
    this.bottomSheet.open(PuzzleChooserBottomSheetComponent);
  }

  public openTemplatePreviewBottomSheet(): void {
    this.loadingFromOtherModuleFix();
    this.bottomSheet.open(TemplatePreviewBottomSheetComponent);
  }

  public openZoomManagementBottomSheet(): void {
    this.loadingFromOtherModuleFix();
    this.bottomSheet.open(ZoomManagementBottomSheetComponent);
  }

  public openGalleryBottomSheet(): void {
    this.loadingFromOtherModuleFix();
    this.bottomSheet.open(GalleryBottomSheetComponent);
  }
}
