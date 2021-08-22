import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  shippingAddressForm = this.formBuilder.group({
    first: ["", Validators.required],
    last: ["", Validators.required],
    company: ["",],
    address: ["", Validators.required],
    apartment: ["",],
    city: ["", Validators.required],
    state: ["", Validators.required],
    postal_code: ["", Validators.required],
  });;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {


  }

}
