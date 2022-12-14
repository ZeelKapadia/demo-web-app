import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomToasterComponent } from 'src/app/Components/custom-toaster/custom-toaster.component';
import { APIEmployee } from 'src/app/Constants/api.helper';
import { Employee } from 'src/app/Constants/models/model';
import { EmpService } from 'src/app/Service/emp.service';
import { inherits } from 'util';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  formAddEmployee: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.maxLength(10)]),
    age: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{2}$')]),
    designation: new FormControl('', [Validators.required]),
  })
  toast = new CustomToasterComponent();
  message: string;
  empData: Employee;
  isUpdate = this.route.url.includes('update-emp');
  id: string;
  Pagename = this.isUpdate ? 'Update Employee':'Add Employee';
  image=""
  avtar:any

  constructor(private formBuilder: FormBuilder, private route: Router, private empService: EmpService) { }

  init(): void {
    if (this.isUpdate) {
      this.id = localStorage.getItem("updateId")!
      localStorage.removeItem("updateId")!
      if (!this.id) {
        this.route.navigateByUrl('emp');
      }
      const obj = {
        employeeId: this.id
      }
      this.empService.getDetailData(obj).subscribe({
        next: (resp: any) => {
          const result =resp.response
          
          this.formAddEmployee.patchValue({
            name: result.name,
            email:result.email,
            phone:result.phone,
            age: result.age,
            designation:result.designation,
          })
          this.image = APIEmployee.IMAGE + resp.response.avtar
        }
      })
    }
    else {
      this.formAddEmployee.setValue({
        name: '',
        email: '',
        phone: '',
        age: '',
        designation: '',
      })
    }
  }

  ngOnInit(): void {
    this.init()
  }

  findMissingValue(): void {
    let name = this.formAddEmployee.controls['name'].value;
    let email = this.formAddEmployee.controls['email'].value;
    let phone = this.formAddEmployee.controls['phone'].value;
    let age = this.formAddEmployee.controls['age'].value;
    let Confpassword = this.formAddEmployee.controls['designation'].value;

    if (name === "") {
      this.message = "Enter your name"
    }
    else if (email === "") {
      this.message = "Enter your Email"
    }
    else if (phone === "") {
      this.message = "Enter your phoneNo"
    }
    else if (age === "") {
      this.message = "Enter your age"
    }
    else if (Confpassword === "") {
      this.message = "reEnter your password to confirm"
    }
    else {
      if (this.formAddEmployee.controls['email'].errors) {
        this.message = "email is not valid"
      }
      else if (this.formAddEmployee.controls['phone'].errors) {
        this.message = "phone is not valid"

      }
      else if (age !== Confpassword) {
        this.message = "Password doesnt match"
      }
    }
    this.toast.showAlert();
  }

  prepareData(): void {
    console.log(this.avtar);
    
    if (this.isUpdate) {
      this.empData = {
        employeeId: this.id,
        name: this.formAddEmployee.controls['name'].value,
        email: this.formAddEmployee.controls['email'].value,
        phone: this.formAddEmployee.controls['phone'].value,
        age: this.formAddEmployee.controls['age'].value,
        designation: this.formAddEmployee.controls['designation'].value,
        avtar:this.avtar
      }
    }
    else {
      this.empData = {
        name: this.formAddEmployee.controls['name'].value,
        email: this.formAddEmployee.controls['email'].value,
        phone: this.formAddEmployee.controls['phone'].value,
        age: this.formAddEmployee.controls['age'].value,
        designation: this.formAddEmployee.controls['designation'].value,
        avtar:this.avtar
      }
    }
    let formData:FormData = new FormData();
        formData.append('avtar', this.avtar, this.avtar.name);
        formData.append("name",this.formAddEmployee.controls['name'].value);
        formData.append("email",this.formAddEmployee.controls['email'].value);
        formData.append("phone",this.formAddEmployee.controls['phone'].value);
        formData.append("designation",this.formAddEmployee.controls['designation'].value);
        formData.append("age",this.formAddEmployee.controls['age'].value);
    this.sendData(formData)
  }

  sendData(empData: any): void {
    if (this.isUpdate) {
      this.empService.updateEmployee(empData).subscribe({
        next: (response: any) => {
          this.message = response.message
          this.toast.showAlert()
        },
        error: (error: any) => {
          this.message = error.error.message
          this.toast.showAlert()
        }
      })
    }
    else {
      this.empService.addEmployee(empData).subscribe({
        next: (response) => {
          this.message = response.message
          this.toast.showAlert()
        },
        error: (error) => {
          this.message = error.error.message
          this.toast.showAlert()
        }
      })
    }
    setTimeout(() => {
      this.route.navigateByUrl('emp')
    }, 1000);
  }

  validation(): void {
    if (this.formAddEmployee.valid) {
      this.prepareData();
    }
    else {
      this.findMissingValue()
    }
  }

  onRegisterEmployee(): void {
    this.validation()
  }

  onChange(event:any):void{
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.avtar = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  
}
