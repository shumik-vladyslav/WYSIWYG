import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { EditorViewComponent } from './editor-view/editor-view.component';


const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  },
  {
    path: 'view',
    component: EditorViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
