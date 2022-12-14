import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIAdmin } from '../Constants/api.helper';
import { Login, LoginResponse, Registration} from '../Constants/models/model';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private jwtHelper:JwtHelperService) { }


  login(loginData:Login):Observable<HttpResponse<LoginResponse>>{
    return this.http.post(APIAdmin.ADMIN_LOGIN, loginData,{observe:'response'}) as Observable<HttpResponse<LoginResponse>> ;
  }
  register(registerData:Registration):Observable<{message:string}>{
    return this.http.post(APIAdmin.ADMIN_REGISTER, registerData) as Observable<{message:string}> ;
  }

  isAuthenticated():boolean{
    var token=localStorage.getItem("login")!;
    return !this.jwtHelper.isTokenExpired(token)
  }

  passwordGenerator():Observable<string>{
    return this.http.get(APIAdmin.AUTO_PASS_GEN) as Observable<string>
  }
}
