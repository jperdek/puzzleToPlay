import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleBuilderComponent } from './puzzle-builder/puzzle-builder.component';

const routes: Routes = [{
  path: '',
  component: PuzzleBuilderComponent,
  loadChildren: () => import('./puzzle-builder/puzzle-builder.module').then(m => m.PuzzleBuilderModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
