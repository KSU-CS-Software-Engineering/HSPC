import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as UIkit from 'uikit';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';


@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend,
              private defaultOptions: RequestOptions,
              private router: Router,
              private toastService: ToastService,
              private authService: AuthService
            ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // do whatever
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }
    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {
    return (res: Response) => {
      if (res.status === 401) {
        this.authService.logout();
        this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url }});
      }
      if (res.status === 403) {
        this.router.navigate(['/'], { queryParams: { returnUrl: this.router.url }});
        this.toastService.toast('Insufficient privileges for page', 'fa-exclamation-circle', 'danger', '3000');
      }
      if (res.status === 500) {
        this.router.navigate(['error']);
        console.log('error');
      }
      return Observable.throw(res);
    };
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    objectToSetHeadersTo.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
}
