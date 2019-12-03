import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './services/snackbar.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { WeatherService } from './services/weather-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  header = false;
  editor = false;
  loggedIn = false;
  loading = false;
  weather = '';
  title = 'VastDime';

  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private weatherService: WeatherService,
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
    if (url === 'editor') {
      const name = this.router.url.toString();
      if (!name.includes('editor/programs') && !name.includes('editor/user-home')) {
        this.router.navigate(['editor']);
        setTimeout(() => location.reload(), 200);
      }
    }
    this.router.navigate([url]);
  }

  async showWeather() {
    try {
      this.loading = true;
      const forcast = await this.weatherService.getWeather();
      const hour = forcast.properties.periods[0];
      this.snackbarService.showInfo(`The weather in Chapel hill is ${ hour.temperature } °F and ${ hour.shortForecast }`);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
}
