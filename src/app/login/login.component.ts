import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  image = "assets/images/lounge-digital-data-protection.gif"
  constructor(
    private builder : FormBuilder,
    private toastr : ToastrService,
    private auth : AuthService,
    private router : Router
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
  login() {
    if (this.loginForm.valid) {
  

      const userDetails: { username: string, password: string } = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      };
  
      this.auth.login(userDetails).subscribe(
        (response) => {
          // Registration successful, handle the response as needed
          this.toastr.success(`${response.message}`);
          // Optionally, you can redirect the user to a different page
          this.router.navigate(['/']);
        },
        (error) => {
          // Registration failed, handle the error
          this.toastr.error(`${error.error.error}`);
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.');
    }
  }
}
