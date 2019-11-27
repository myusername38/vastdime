import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from '../components/editor/editor.component';
import { LoadPageComponent } from '../components/load-page/load-page.component';
import { UserHomeComponent } from '../components/user-home/user-home.component';

const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'programs', component: LoadPageComponent },
  { path: 'userhome', component: UserHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeEditorRoutingModule { }
