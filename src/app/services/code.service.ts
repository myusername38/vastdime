import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CodeMetaData } from '../interfaces/codeMetaData'

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  // url = 'http://localhost:5000/vastdime-4c82c/us-central1/api';
  url = environment.url;
  program: { username: string, title: string } = null;

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

  getprogram(username: string, program: string): Promise<any> {
    let params = new HttpParams().set('username', username);
    params = params.append('program', program);
    return this.http.get(`${ this.url }/getcode`, { params }).toPromise();
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

  getPublicCode(language: string): Promise<CodeMetaData[]> {
    const params = new HttpParams().set('language', language);
    return this.http.get<CodeMetaData[]>(`${ this.url }/getpubliccode`, { params }).toPromise();
  }

  setProgram(username, title) {
    this.program = { username, title };
  }
  getProgramToLoad() {
    return this.program;
  }
}
