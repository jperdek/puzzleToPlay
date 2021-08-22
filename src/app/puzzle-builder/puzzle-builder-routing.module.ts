import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleChooserComponent } from './pages/puzzle-chooser/puzzle-chooser.component';

const routes: Routes = [{
  path: '',
  component: PuzzleChooserComponent,
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
