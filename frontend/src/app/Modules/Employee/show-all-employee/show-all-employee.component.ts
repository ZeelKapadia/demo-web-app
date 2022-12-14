import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeePagedData, PagedObject } from 'src/app/Constants/models/model';
import { EmpService } from 'src/app/Service/emp.service';
import { Toast } from 'bootstrap';


@Component({
  selector: 'app-show-all-employee',
  templateUrl: './show-all-employee.component.html',
  styleUrls: ['./show-all-employee.component.css']
})
export class ShowAllEmployeeComponent implements OnInit {

  employeeList: Employee[] = [];
  pagedObject: PagedObject;
  isShowpagination: boolean = false;
  pageNum = 1;
  limit = 20;
  message = ""
  isShowMessage = false;
  field=""
  order=""

  constructor(private employeeService: EmpService, private route: Router) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList(): void {
    this.isShowpagination = false
    this.employeeService.getPagedData(this.pageNum, this.limit, this.field, this.order).subscribe((response: EmployeePagedData) => {
      
      this.employeeList = response.data;
      this.pagedObject = {
        totalRec: response.totalRec,
        totalPage: response.totalPage,
        CurrentPage: response.currentPage,
        limit: response.limit,
        hasNextPage: response.hasNextPage,
        hasPrevPage: response.hasPrevPage
      };
      this.isShowpagination = true
    });
    ;
  }

  onDelete(id: string): void {
    if (confirm("Are you sure?? you want to delete a record?")) {
      this.employeeService.deleteData(id).subscribe(resp => {
        this.message = resp.message
        const toastLiveExample = document.getElementById('toast')!
        const toast = new Toast(toastLiveExample)
        this.getEmployeeList()
        toast.show();


        setTimeout(() => {
          toast.hide
        }, 4000);
      })
    }
  }
  onUpdate(id: string): void {
    localStorage.setItem("updateId", id)
    this.route.navigateByUrl('update-emp')
  }

  onPageChanged(pageNum: number) {
    this.pageNum = pageNum;
    this.getEmployeeList();
  }
  onLimitChange(limit: number) {
    this.limit = limit;
    this.pageNum = 1;
    this.getEmployeeList();
  }
  onAddEmployee(): void {
    this.route.navigateByUrl('add-emp')
  }
  onShowDetails(id:string):void{
    localStorage.setItem("showId",id)
    this.route.navigateByUrl("emp-detail")
  }


  onToggle(field:string,order:string):void{
    this.order = order;
    this.field = field;
    this.getEmployeeList();
  }
}
