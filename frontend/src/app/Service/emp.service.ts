import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEmployee } from '../Constants/api.helper';
import { Employee } from '../Constants/models/model';
import { CustomHeaders } from './helper/service.helper';


@Injectable({
  providedIn: 'root'
})
export class EmpService {

  header=new CustomHeaders();

  constructor(private http: HttpClient) { }

  getPagedData(page: number, limit: number, sortBy: string, sortOrder: string): any {
    return this.http.get(APIEmployee.PAGINATION_EMPLOYEE + `?page=${page}&limit=${limit}&sort=${sortBy}&sortOrder=${sortOrder}`);
  }
  
  deleteData(id: string): Observable<any> {
    return this.http.delete(APIEmployee.DELETE_EMPLOYEE,this.header.employeeHeadersDelete(id)) as Observable<any>
  }
  
    getDetailData(id:any):any{
      return this.http.post(APIEmployee.GET_EMPLOYEE,id)
    }

  addEmployee(empData:any):Observable<{message:string}>{
        let headers = new HttpHeaders();
         headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    return this.http.post(APIEmployee.ADD_EMPLOYEE,empData,{headers:headers}) as Observable<any>
  }

  updateEmployee(empData:Employee):any{
        let headers = new HttpHeaders();
         headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    return this.http.put(APIEmployee.EDIT_EMPLOYEE,empData,{headers:headers})
  }
}
