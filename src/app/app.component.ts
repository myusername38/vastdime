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
  name;

  constructor(public router: Router) {
  }
  title = 'VastDime';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  header() {
    this.name = this.router.url.toString();
    if (this.name === '/home' || this.name === '/login' || this.name === '/register' || this.name === '/about') {
      return false;
    }
    return true;
  }


}
