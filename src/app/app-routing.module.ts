import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { redirectUnauthorizedTo, AngularFireAuthGuard, canActivate } from '@angular/fire/auth-guard';
import { LoadPageComponent } from './components/load-page/load-page.component';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['home']);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { animation: 'isRight' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'isLeft' } },
  { path: 'about', component: AboutComponent, data: { animation: 'isRight' } },
  { path: 'load', component: LoadPageComponent, data: { animation: 'isRight' } },
  { path: '', loadChildren: () => import ('./code-editor/code-editor.module').then(mod => mod.CodeEditorModule),
  ...canActivate(redirectUnauthorizedToLanding) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
