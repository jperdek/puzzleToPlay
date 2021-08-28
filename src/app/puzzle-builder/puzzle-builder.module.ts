import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleBuilderRoutingModule } from './puzzle-builder-routing.module';
import { PuzzleBoardComponent } from './pages/puzzle-board/puzzle-board.component';
import { PuzzleBuilderComponent } from './pages/puzzle-builder-component/puzzle-builder.component';
import { MaterialModule } from '../material/material.module';
import { PuzzleChooserComponent } from './pages/puzzle-chooser/puzzle-chooser.component';
import { RemoveDirective } from '../directives/remove.directive';
import { TemplatePreviewComponent } from './pages/template-preview/template-preview.component';
import { InsertTemplateImageComponent } from './pages/insert-template-image/insert-template-image.component';
import { DragAndDropDirective } from '../directives/drag-and-drop.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PuzzleChooserBottomSheetComponent } from './pages/bottom-sheets/puzzle-chooser-bottom-sheet/puzzle-chooser-bottom-sheet.component';
import { TemplatePreviewBottomSheetComponent } from './pages/bottom-sheets/template-preview-bottom-sheet/template-preview-bottom-sheet.component';
import { InsertTemplateImageBottomSheetComponent } from './pages/bottom-sheets/insert-template-image-bottom-sheet/insert-template-image-bottom-sheet.component';
import { ZoomManagementComponent } from './pages/zoom-management/zoom-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoomMenuComponent } from './components/zoom-menu/zoom-menu.component';


@NgModule({
  declarations: [
    PuzzleBoardComponent,
    PuzzleBuilderComponent,
    PuzzleChooserComponent,
    RemoveDirective,
    TemplatePreviewComponent,
    InsertTemplateImageComponent,
    DragAndDropDirective,
    PuzzleChooserBottomSheetComponent,
    TemplatePreviewBottomSheetComponent,
    InsertTemplateImageBottomSheetComponent,
    ZoomManagementComponent,
    ZoomMenuComponent,
  ],
  imports: [
    CommonModule,
    PuzzleBuilderRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class PuzzleBuilderModule { }
