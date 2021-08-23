import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {



  constructor(private http: HttpClient) { }


  validateAddress(address: Object) {
    const validateURL = '/api/validate';
    return this.http.post(validateURL, address);
  }
}
