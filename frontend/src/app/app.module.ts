import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './Modules/Employee/add-employee/add-employee.component';
import { ShowEmployeeComponent } from './Modules/Employee/show-employee/show-employee.component';
import { ShowAllEmployeeComponent } from './Modules/Employee/show-all-employee/show-all-employee.component';
import { LoginAdminComponent } from './Modules/Admin/login-admin/login-admin.component';
import { RegisterAdminComponent } from './Modules/Admin/register-admin/register-admin.component';
import { ShowAdminComponent } from './Modules/Admin/show-admin/show-admin.component';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { CustomToasterComponent } from './Components/custom-toaster/custom-toaster.component';
import { AuthInterceptor } from './Authorizastion/AuthInterceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FixedHeaderComponent } from './Extras/fixed-header/fixed-header.component';
import { ImageFullScreenComponent } from './Extras/image-full-screen/image-full-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ShowEmployeeComponent,
    ShowAllEmployeeComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    ShowAdminComponent,
    HeaderComponent,
    PaginationComponent,
    CustomToasterComponent,
    FixedHeaderComponent,
    ImageFullScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: AuthInterceptor,  
      multi: true  
    },
    JwtHelperService,{
      provide:JWT_OPTIONS,
      useValue:JWT_OPTIONS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
