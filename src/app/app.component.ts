import { Component } from '@angular/core';
import { slider, transformer, fader, stepper } from './route-animations';
import { SnackbarService } from './services/snackbar.service';
import { RouterOutlet, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ // <-- add your animations here
    slider,
  ]
})
export class AppComponent {
  header = false;
  editor = false;
  loggedIn = false;

  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private snackbarService: SnackbarService) {
    this.router.events.subscribe((event) => {
      this.header = this.setHeader();
      this.editor = this.isEditor();
    });
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
      }
    });
  }
  title = 'VastDime';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  setHeader() {
    const name = this.router.url.toString();
    if (name.includes('editor')) {
      return true;
    }
    return false;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.snackbarService.showInfo('Logged out');
    this.router.navigate(['']);
  }

  login() {
    this.router.navigate(['login']);
  }

  isEditor() {
    const name = this.router.url.toString();
    if (name === '/') {
      return true;
    }
    return false;
  }

  nav(url) {
    this.router.navigate([url]);
  }
}
