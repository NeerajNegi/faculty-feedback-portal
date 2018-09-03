import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (JSON.parse(localStorage.getItem('userInfo')) != null) {
     if (JSON.parse(localStorage.getItem('userInfo')).token ) {
       headersConfig['token'] = JSON.parse(localStorage.getItem('userInfo')).token;
     }
    } else {
      headersConfig['token'] =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmYWN1bHR5X2lkIjo0LCJleHAiOjE1MTQ1NDkxMjN9.1Cmilgc_SLnS0y7CvnvvZM-LFth8LXjxo1rM16l4zEQ'    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string, params?: any): Observable<any> {
    let url = environment.api_url + '/' + path;
     if (params) {
      url = environment.api_url + '/' + path + '' + params;
    }
    return this.http.get(url, { headers: this.setHeaders() })
    .map((res: Response) => res.json())
    .catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

  put(path: string, body: any): Observable<any> {
    let url = environment.api_url+'/'+path;
    //body.token = JSON.parse(localStorage.getItem('userInfo')).token;
    return this.http.put(
      url,
      body,
      { headers: this.setHeaders() }
    )
    .map((res: Response) => res.json())
    .catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

  post(path: string, body: any): Observable<any> {
      console.log(path,body);
      let url = environment.api_url+'/'+path;
      console.log(url);
      //body.token = JSON.parse(localStorage.getItem('userInfo')).token;
    return this.http.post(
      url,
      body,
      { headers: this.setHeaders() }
    )
    .map((res: Response) => res.json())
    .catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .map((res: Response) => res.json())
    .catch((error: Response) => {
      return Observable.throw(error.json());
    });
  }
}
