import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomToasterComponent } from 'src/app/Components/custom-toaster/custom-toaster.component';
import { Registration } from 'src/app/Constants/models/model';
import { AdminService } from 'src/app/Service/login-service.service';
import { createPopper } from '@popperjs/core';


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  formRegister: FormGroup = this.formBuilder.group({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$') ,Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })
  toast=new CustomToasterComponent();
  message:string;
  registerObj: Registration;
  isUpdate:boolean;
  autoGeneratePassword:string;
  showAutoPass=false


  constructor(private formBuilder: FormBuilder,private registerService:AdminService,private route:Router) { }

  ngOnInit(): void {
  }
  
  findMissingValue():void{
    let userName = this.formRegister.controls['userName'].value;
    let email = this.formRegister.controls['email'].value;
    let mobile = this.formRegister.controls['mobile'].value;
    let password = this.formRegister.controls['password'].value;
    let Confpassword = this.formRegister.controls['confirmPassword'].value;

    if (userName==="") {
      this.message="Enter your UserName"
    }
    else if (email==="") {
      this.message="Enter your Email"
      this.toast.showAlert();
    }
    else if (mobile==="") {
      this.message="Enter your MobileNo"
    }
    else if (password==="") {
      this.message="Enter your Password"
    }
    else if (Confpassword==="") {
      this.message="reEnter your password to confirm"
    }
    else{
      if (this.formRegister.controls['email'].errors) {
        this.message="email is not valid"
      }
      else if(this.formRegister.controls['mobile'].errors){
        this.message="Mobile is not valid"        
      }
      else if (password !== Confpassword) {
        this.message="Password doesnt match"
      }
    }
    this.toast.showAlert();
  }

  prepareData():void{
    this.registerObj = {
      name: this.formRegister.controls['userName'].value,
      email: this.formRegister.controls['email'].value,
      mobile: this.formRegister.controls['mobile'].value,
      password: this.formRegister.controls['password'].value
    }
    this.sendData(this.registerObj)
  }

  sendData(regData:Registration):void{
    this.registerService.register(regData).subscribe({
      next: (response)=>{
        debugger
        this.message = response.message
        this.toast.showAlert()
        this.route.navigate(["/"])
      },
      error: (error)=>{
        debugger
        this.message = error.error.message
        this.toast.showAlert()
      }
    })
  }

  validation(): void {
    if (this.formRegister.valid) {
      this.prepareData();
    }
    else {
      this.findMissingValue()
    }
  }

  onRegistration(): void {
    this.validation()
  }

  onClick():void{
    this.registerService.passwordGenerator().subscribe({
      next:(response:any)=>{
        this.message = "we have generate a password for you.\n"+response.result
        this.toast.showAlert();
      }
    })
  }

}
