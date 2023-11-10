import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-verify-users',
  templateUrl: './verify-users.component.html',
  styleUrls: ['./verify-users.component.scss']
})
export class VerifyUsersComponent {
  constructor(
    private builder : FormBuilder,
    private toastr : ToastrService,
    private auth : AuthService,
    private router : Router,
    private dataService : DataService
  ){}
  otpForm = this.builder.group({
    otp: this.builder.control("",Validators.compose([
      Validators.required,
      Validators.maxLength(6)
    ]))
  })
  submitOTP(){
    if (this.otpForm.valid) {
      const formData = this.dataService.getFormData();
       const userData :{otp:string,email:string}={
        otp : this.otpForm.value.otp!,
        email : formData
       }
       if (formData) {
          this.auth.submit_otp(userData).subscribe(
            (response)=>{
              this.toastr.success(response.message)
              this.router.navigate(["/login"])
            },(error)=>{
              this.toastr.error(error.error.error)
            }
          )
       }
    }
  }
}
