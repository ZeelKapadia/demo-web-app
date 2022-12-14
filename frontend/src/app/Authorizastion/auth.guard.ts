import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../Service/login-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth:AdminService,private route:Router){}
    
  canActivate():boolean {
    if (!this.auth.isAuthenticated()) {
      this.route.navigate([""])
      return false;
    }
    return true;
  }
}
