import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  image = "assets/images/lounge-digital-data-protection.gif"
  constructor(
    private builder : FormBuilder,
    private toastr : ToastrService
  ){}
  loginForm = this.builder.group({
    username : this.builder.control("",Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])),
    password : this.builder.control("",Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ]))
  })
}
