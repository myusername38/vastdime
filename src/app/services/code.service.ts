import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  // url = 'http://localhost:5000/vastdime-4c82c/us-central1/api';
  url = environment.url;

  constructor(private http: HttpClient) { }

  testInterceptor(item: string): Promise<any> {
    return this.http.post(`${ this.url }/testToken`, { test: 'test' }).toPromise();
  }

  register(email: string, username: string, password: string): Promise<any> {
    return this.http.post(`${ this.url }/signup`, { email, username, password }).toPromise();
  }

  putprogram(name: string, description: string, filetype: string, code: string): Promise<any> {
    return this.http.post(`${ this.url }/addcode`, { name, description, filetype, code }).toPromise();
  }

  getprogram(username: string, name: string): Promise<any> {
    return this.http.post(`${ this.url }/get`, { username, name }).toPromise();
  }

  deleteprogram(title: string, language: string): Promise<any> {
    return this.http.post(`${ this.url }/deletecode`, { title, language }).toPromise();
  }

  makeprivate(title: string): Promise<any> {
    return this.http.post(`${ this.url }/privatecode`, { title }).toPromise();
  }

  unlist(title: string): Promise<any> {
    return this.http.post(`${ this.url }/unlistcode`, { title }).toPromise();
  }

  unprivate(title: string): Promise<any> {
    return this.http.post(`${ this.url }/unprivatecode`, { title }).toPromise();
  }

  list(title: string): Promise<any> {
    return this.http.post(`${ this.url }/listcode`, { title }).toPromise();
  }

  getpubliccode(title: string, language: string): Promise<any> {
    return this.http.post(`${ this.url }/getpubliccode`, { title, language }).toPromise();
  }




  //TODO: save, getdocument stuff like that
  // all of your http calls are going to be in here

}
