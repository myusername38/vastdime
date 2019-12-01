import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component'
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['home']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'editor', loadChildren: () => import ('./code-editor/code-editor.module').then(mod => mod.CodeEditorModule) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
