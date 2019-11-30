import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CodeMetaData } from '../interfaces/codeMetaData';
import { UserCodeData } from '../interfaces/userCodeData';

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

  putProgram(programData: { title: string, description: string, language: string, program: string, unlisted: boolean, private: boolean }): Promise<any> {
    return this.http.post(`${ this.url }/addcode`, programData).toPromise();
  }

  putProgramNoVisibility(programData: { title: string, description: string, language: string, program: string }): Promise<any> {
    return this.http.post(`${ this.url }/addcode`, programData).toPromise();
  }

  getprogram(username: string, program: string): Promise<any> {
    let params = new HttpParams().set('username', username);
    params = params.append('program', program);
    return this.http.get(`${ this.url }/getcode`, { params }).toPromise();
  }

  deleteProgram(title: string, language: string): Promise<any> {
    let params = new HttpParams().set('title', title.replace(/ /g, '_'));
    params = params.append('language', language);
    return this.http.delete(`${ this.url }/deletecode`, { params }).toPromise();
  }

  privateCode(title: string): Promise<any> {
    return this.http.put(`${ this.url }/privatecode`, { title }).toPromise();
  }

  unListCode(title: string): Promise<any> {
    return this.http.put(`${ this.url }/unlistcode`, { title }).toPromise();
  }

  unPrivateCode(title: string): Promise<any> {
    return this.http.put(`${ this.url }/unprivatecode`, { title }).toPromise();
  }

  listCode(title: string): Promise<any> {
    return this.http.put(`${ this.url }/listcode`, { title }).toPromise();
  }

  getPublicCode(language: string): Promise<CodeMetaData[]> {
    const params = new HttpParams().set('language', language);
    return this.http.get<CodeMetaData[]>(`${ this.url }/getpubliccode`, { params }).toPromise();
  }

  getUserCode(): Promise<UserCodeData[]> {
    return this.http.get<UserCodeData[]>(`${ this.url }/getusercode`).toPromise();
  }

  setProgram(username, title) {
    this.program = { username, title };
  }
  getProgramToLoad() {
    return this.program;
  }
}
