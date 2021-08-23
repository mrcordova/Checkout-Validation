import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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

  onSubmit(event: Event) {
    event.preventDefault();

    const addressObj: Record<string, any> = {};

    Object.keys(this.shippingAddressForm.controls).forEach(key => {
      addressObj[key] = this.shippingAddressForm.get(key)?.value;
    })


    // if (!this.shippingAddressForm.valid) return;

    // const obj = {
    //   "firstName": "",
    //   "lastName": "",
    //   "company": "",
    //   "line1": this.shippingAddressForm.get("line1")?.value,
    //   "line2": "apt #3",
    //   "city": "pacoima",
    //   "state": "CA",
    //   "postalCode": "91331",
    //   "country": "US",
    //   "residential": true
    // }

    addressObj["country"] = "US";
    addressObj["residential"] = "false";

    // console.log(obj);
    this.httpService.validateAddress(addressObj).subscribe(val => {
      console.log("Post successful", val)
    },
      error => {
        console.log("here", error)
      }
    )

  }


}
