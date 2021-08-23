import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { finalize, timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpService } from './http.service';


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
    line1: ["", Validators.required],
    line2: ["",],
    city: ["", Validators.required],
    state: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    postalCode: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
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
      (error) => {
        if (error.status == 404) {
          alert("URL could not be found")
        } else if (error.status == 400) {
          alert("Bad Request: Address improperly sent")
        } else if (error.status == 500) {
          alert(error.error.message)
        } else if ( error.status == 504){
          alert(`Gateway timeout:  ${error.error}`);
        
        }
        alert(error);
        this.errors = error.message;
        console.log(this.errors)
        this.showNetworkErrors = true;
      }
    )

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
