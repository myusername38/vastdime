import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()


export class InterceptorService implements HttpInterceptor {

  token = '';
  tempToken = '';

  constructor(public afAuth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.afAuth.auth.currentUser) {
      this.afAuth.auth.currentUser.getIdToken(true)
      .then((t) => {
        this.token = t;
      });
      if (this.token === '') {
        /* Note: Firebase is weird and I have to do this*/
        // @ts-ignore
        this.token = this.afAuth.auth.currentUser.ma;
      }
    }

    if (req.url.includes('signup') || req.url.includes('weather')) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        Token: this.token
      }
    });
    return next.handle(req);
  }
}

