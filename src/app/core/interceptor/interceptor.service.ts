import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,

} from '@angular/common/http';
@Injectable()

export class InterceptorService implements HttpInterceptor {
  api: any;
  requests = [];

  constructor() { }



  generateApiUrl() {
    let url = '';

    url = 'http://' + environment.apiUrl;
    if (environment.port) {
      url = url + ':' + environment.port;
    }
    url = url + '/';
    if (environment.isSecure) {
      url = url.replace('http://', 'https://');
    }
    console.log(url)
    return url;
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const basicUrl: string = this.generateApiUrl();
    this.api = request.url;

    this.requests.push(request);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    request = request.clone({
      url: basicUrl + request.url,
      headers: headers
    });

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {

            observer.next(event);

          },
          err => {
            this.removeRequest(request);
            if (err.status == 401) {

            } else if (err.status == 500) {

            }
            observer.error(err);

          },
          () => {
            this.removeRequest(request);
            observer.complete();

          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }

  removeRequest(req: HttpRequest<any>) {

    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }


  }
}
