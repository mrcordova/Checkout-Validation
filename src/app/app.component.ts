import { Component } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  shippingAddressForm: FormGroup | undefined;

  constructor() {
    this.shippingAddressForm = new FormGroup({
      'first': new FormControl(null, Validators.required),
      'last': new FormControl(null),
      'company': new FormControl(null),
      'address': new FormControl(null),
      'apartment': new FormControl(null),
      'city': new FormControl(null),
      'state': new FormControl(null),
      'postal-code': new FormControl(null),
    });
  }


}
