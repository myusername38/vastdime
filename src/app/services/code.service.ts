import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  url = 'http://localhost:5000/vastdime-4c82c/us-central1/api';

  constructor(private http: HttpClient) { }

  testInterceptor(item: string): Promise<any> {
    return this.http.post(`${ this.url }/testToken`, { test: 'test' }).toPromise();
  }

  register(email: string, password: string): Promise<any> {
    return this.http.post(`${ this.url }/signup`, { email, password }).toPromise();
  }


  //TODO: save, getdocument stuff like that
  // all of your http calls are going to be in here

}
