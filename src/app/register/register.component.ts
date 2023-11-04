import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder, 
    private toastr: ToastrService,
    private auth : AuthService,
    private router : Router
    ) {}
  registrationForm = this.builder.group({
    username: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ])
    ),
    confirmPassword: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ),
  });

  register() {
    if (this.registrationForm.valid) {
      const userDetails: { username: string, email: string, password: string } = {
        username: this.registrationForm.value.username!,
        email: this.registrationForm.value.email!,
        password: this.registrationForm.value.password!
      };
  
      this.auth.register(userDetails).subscribe(
        (response) => {
          // Registration successful, handle the response as needed
          this.toastr.success(`${response.message}`);
          // Optionally, you can redirect the user to a different page
          this.router.navigate(['/login']);
        },
        (error) => {
          // Registration failed, handle the error
          this.toastr.error(`${error.error.message}`);
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.');
    }
  }
  


  onTestApp(){

    // this.auth.test({name:"Sunil"}).subscribe((res: any)=>{
    //   console.log("responmse fromserever ---", res)
    // })

  }
}