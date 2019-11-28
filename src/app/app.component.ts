import { Component } from '@angular/core';
import { slider, transformer, fader, stepper } from './route-animations';
import { RouterOutlet, Router } from '@angular/router';

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

  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      this.header = this.setHeader();
      this.editor = this.isEditor();
    });
  }
  title = 'VastDime';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  setHeader() {
    const name = this.router.url.toString();
    if (name === '/home' || name === '/login' || name === '/register' || name === '/about' || name === '/reset') {
      return false;
    }
    return true;
  }
  isEditor() {
    const name = this.router.url.toString();
    if (name === '/') {
      return true;
    }
    return false;
  }
}
