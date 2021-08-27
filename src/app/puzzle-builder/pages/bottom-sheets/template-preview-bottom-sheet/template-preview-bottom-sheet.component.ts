import { Component} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-template-preview-bottom-sheet',
  templateUrl: './template-preview-bottom-sheet.component.html',
  styleUrls: ['./template-preview-bottom-sheet.component.scss']
})
export class TemplatePreviewBottomSheetComponent{

  constructor(private bottomSheetRef: MatBottomSheetRef<TemplatePreviewBottomSheetComponent>) {}

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
