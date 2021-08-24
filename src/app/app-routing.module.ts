import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { PuzzleBuilderComponent } from './puzzle-builder/puzzle-builder.component';

const routes: Routes = [
  {
    path: '',
    component: InitialPageComponent,
  },
  {
    path: 'puzzle',
    component: PuzzleBuilderComponent,
    loadChildren: () => import('./puzzle-builder/puzzle-builder.module').then(m => m.PuzzleBuilderModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
