import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleBuilderRoutingModule } from './puzzle-builder-routing.module';
import { PuzzleBoardComponent } from './pages/puzzle-board/puzzle-board.component';
import { PuzzleBuilderComponent } from './puzzle-builder.component';
import { MaterialModule } from '../material/material.module';
import { PuzzleChooserComponent } from './pages/puzzle-chooser/puzzle-chooser.component';
import { RemoveDirective } from '../directives/remove.directive';
import { TemplatePreviewComponent } from './pages/template-preview/template-preview.component';


@NgModule({
  declarations: [
    PuzzleBoardComponent,
    PuzzleBuilderComponent,
    PuzzleChooserComponent,
    RemoveDirective,
    TemplatePreviewComponent
  ],
  imports: [
    CommonModule,
    PuzzleBuilderRoutingModule,
    MaterialModule
  ]
})
export class PuzzleBuilderModule { }