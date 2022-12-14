import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AdminService } from '../Service/login-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
        constructor(public auth: AdminService) { } 
        
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
            const token = localStorage.getItem("login")
            if (token) {
                const cloneReq = request.clone({
                    headers:request.headers.set(
                        'Authorization',"Bearer "+token,
                    )
                })
                return next.handle(cloneReq);
            }
            
            return next.handle(request);
        }
}  