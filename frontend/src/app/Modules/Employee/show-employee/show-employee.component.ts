import { Component, OnInit } from '@angular/core';
import { CustomToasterComponent } from 'src/app/Components/custom-toaster/custom-toaster.component';
import { APIEmployee } from 'src/app/Constants/api.helper';
import { EmpService } from 'src/app/Service/emp.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private empService: EmpService) { }

  imgUrl: string = "";
  empName: string = ""
  empEmail: string = ""
  empPhone: string = ""
  empAge: number = 0
  designation: string = ""
  toast = new CustomToasterComponent();
  message = ""

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    var id = localStorage.getItem("showId")!
    const idObj = {
      employeeId: id
    }
    this.getRecord(idObj);
  }

  getRecord(id: any) {
    this.empService.getDetailData(id).subscribe({
      next: (resp: any) => {
        if (resp.response.avtar) {
          this.empName = resp.response.name
          this.empEmail = resp.response.email
          this.empPhone = resp.response.phone
          this.empAge = resp.response.age
          this.designation = resp.response.designation
          const avtar = APIEmployee.IMAGE + resp.response.avtar;
          this.imgUrl = avtar
        }
        else{
          this.empName = resp.response.name;
          this.empEmail = resp.response.email;
          this.empPhone = resp.response.phone;
          this.empAge = resp.response.age;
          this.designation = resp.response.designation;
        }
      },
      err: (err: any) => {
        this.message = err.error.message
        this.toast.showAlert()
      }
    })
  }

}
