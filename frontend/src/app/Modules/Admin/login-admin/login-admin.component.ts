import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login, LoginResponse } from 'src/app/Constants/models/model';
import { AdminService } from 'src/app/Service/login-service.service';
import { Router } from '@angular/router';
import { CustomToasterComponent } from 'src/app/Components/custom-toaster/custom-toaster.component';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: AdminService, private route: Router) { }

  formLogin = this.formBuilder.group({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  ErrorMessage = "";
  toast = new CustomToasterComponent()

  ngOnInit(): void {
  }

  validateForm(form: FormGroup): void {
    if (form.valid) {
      const loginObj = this.prepareObject(form);
      this.submitForm(loginObj);
    }
    else {
      this.invalidForm(form);
    }
  }

  submitForm(login: Login): void {
    this.loginService.login(login).subscribe({
      next: (response) => {

        if (response.status == 200 && response.body!.message == "Login Successful!") {
          localStorage.setItem("login", response.body!.token)
          this.ErrorMessage = "Login Successful!"
          this.toast.showAlert();
          setTimeout(() => {
            this.route.navigate(['/emp'])
          }, 2000);
        }
        else if (response.status == 417) {
          this.ErrorMessage = response.body!.message;
          this.toast.showAlert()
        }
        else {
          this.ErrorMessage = response.body!.message
          this.toast.showAlert()
        }
      },
      error: (e) => {
        this.ErrorMessage = e.error.message;
        this.toast.showAlert()
      },
    })

  }



  invalidForm(form: FormGroup): void {
    if (form.controls['username'].errors) {
      this.ErrorMessage = "UserName is required"
    } else if (form.controls['password'].errors) {
      this.ErrorMessage = "Password is required to authenticate"
    }
    this.toast.showAlert();
  }



  prepareObject(form: FormGroup): Login {
    let loginObj: Login = {
      username: form.controls['username'].value,
      password: form.controls['password'].value
    }
    return loginObj
  }

  onSubmit(): void {
    this.validateForm(this.formLogin);
  }
}



// {
//   "username":"zack@123.com",
//   "password":"zackie@123"
// }
// https://www.youtube.com/watch?v=6ZCJmLKpN6I
//  above link is for the gujarati typing font
// 72,00,000 mili second
// 71,71,200 mili second
// 71,99,999
// 288Days
// 314 days
// 28days
// 26days
// 260 days
// 250 days
// 244 days