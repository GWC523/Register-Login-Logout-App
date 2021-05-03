import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlDirective, FormGroupDirective } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  
  readonly BaseURI = 'http://localhost:59276/api';
  formModel = this.fb.group({
    UserName : ['', [Validators.required]],
    Email : ['', [Validators.required, Validators.email]],
    FullName : ['', [Validators.required]],
    Password : ['', [Validators.required, Validators.minLength(5),]],
    ConfirmPassword : ['', [Validators.required]]
  },{ 
    validator: ConfirmedValidator('Password', 'ConfirmPassword')
  });

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      FullName: this.formModel.value.FullName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
 
}

