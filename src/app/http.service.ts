import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = "https://interview.joshsfrogs.com/";

  constructor(private http: HttpClient) { }


  validateAddress(address: Object) {
    const validateURL = '/api/validate';


    return this.http.post(validateURL, address);

  }
}
