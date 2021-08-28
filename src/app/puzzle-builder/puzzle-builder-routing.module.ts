import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleChooserComponent } from './pages/puzzle-chooser/puzzle-chooser.component';
import { TemplatePreviewComponent } from './pages/template-preview/template-preview.component';
import { InsertTemplateImageComponent } from './pages/insert-template-image/insert-template-image.component';
import { ZoomManagementComponent } from './pages/zoom-management/zoom-management.component';

const routes: Routes = [{
  path: '',
  component: PuzzleChooserComponent,
},
{
  path: 'selectPuzzles',
  component: PuzzleChooserComponent,
},
{
  path: 'preview',
  component: TemplatePreviewComponent
},
{
  path: 'loadImage',
  component: InsertTemplateImageComponent
},
{
  path: 'zoom',
  component: ZoomManagementComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PuzzleBuilderRoutingModule { }
