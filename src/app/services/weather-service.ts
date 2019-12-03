import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(): Promise<any> {
    return this.http.get(`https://api.weather.gov/gridpoints/RAH/57,62/forecast/hourly`).toPromise();
  }
}
