import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder } from '@angular/forms';
import { finalize, timeout } from 'rxjs/operators';

import { HttpService } from './Services/http.service';
import { AddressValidator } from './Validators/AddressValidator';
import { PostalCodeValidator } from './Validators/PostalCodeValidator';
import { StateValidator } from './Validators/StateValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = false;
  showNetworkErrors = false;
  errors : String = "";

  shippingAddressForm = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    company: ["",],
    line1: ["", [Validators.required, AddressValidator()]],
    line2: ["",],
    city: ["", Validators.required],
    state: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2), StateValidator()]],
    postalCode: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5), PostalCodeValidator()]],
  });;


  constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
  }

  ngOnInit() { }


  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.shippingAddressForm.valid) return;

    const addressObj: Record<string, any> = {};

    Object.keys(this.shippingAddressForm.controls).forEach(key => {
      addressObj[key] = this.shippingAddressForm.get(key)?.value;
    })

  
    
    addressObj["country"] = "US";
    addressObj["residential"] = "false";


    this.loading = true
    this.httpService.validateAddress(addressObj).pipe(timeout(10000), finalize(() => this.loading = false)).subscribe((response: Record<string, any>) => {
      Object.keys(this.shippingAddressForm.controls).forEach(key => {
        this.shippingAddressForm.get(key)?.setValue(response[key]);

      })
      this.shippingAddressForm.get('postalCode')?.setValue((this.shippingAddressForm.get('postalCode')?.value).substr(0, 5));
     
      
    },
      (error) => this.displayErrors(error)
    )


  }
  onDismiss() {
    this.showNetworkErrors = false;
  }

  displayErrors( error: any){
    if (error.status == 404) {
      // 404: Not Found
      
      this.errors = error.message;
    } else if (error.status == 400) {
      // 400: Bad Request
      
      this.errors =  error.message;
    } else if (error.status == 500) {
      // 500: Internal Server error
    
      this.errors = error.error.message
    } else if ( error.status == 504){
      // 504: Timed out
    
      this.errors = error.error;
    } else {
      this.errors = error.message;
    }
    this.showNetworkErrors = true;
  }

  get firstName() {
    return this.shippingAddressForm.controls['firstName'];
  }
  get lastName() {
    return this.shippingAddressForm.controls['lastName'];
  }
  get company() {
    return this.shippingAddressForm.controls['company'];
  }
  get line1() {
    return this.shippingAddressForm.controls['line1'];
  }
  get line2() {
    return this.shippingAddressForm.controls['line2'];
  }
  get city() {
    return this.shippingAddressForm.controls['city'];
  }
  get state() {
    return this.shippingAddressForm.controls['state'];
  }
  get postalCode() {
    return this.shippingAddressForm.controls['postalCode'];
  }


}
