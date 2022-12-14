import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Authorizastion/auth.guard';
import { FixedHeaderComponent } from './Extras/fixed-header/fixed-header.component';
import { ImageFullScreenComponent } from './Extras/image-full-screen/image-full-screen.component';
import { LoginAdminComponent } from './Modules/Admin/login-admin/login-admin.component';
import { RegisterAdminComponent } from './Modules/Admin/register-admin/register-admin.component';
import { AddEmployeeComponent } from './Modules/Employee/add-employee/add-employee.component';
import { ShowAllEmployeeComponent } from './Modules/Employee/show-all-employee/show-all-employee.component';
import { ShowEmployeeComponent } from './Modules/Employee/show-employee/show-employee.component';

const routes: Routes = [
  {path:"register",component:RegisterAdminComponent},
  {path:"",component:LoginAdminComponent,pathMatch:"full"},
  {path:"emp",canActivate:[AuthGuard],component:ShowAllEmployeeComponent},
  {path:"add-emp",canActivate:[AuthGuard],component:AddEmployeeComponent},
  {path:"update-emp",canActivate:[AuthGuard],component:AddEmployeeComponent},
  {path:"emp-detail",canActivate:[AuthGuard],component:ShowEmployeeComponent},
  {path:"personalURL",component:FixedHeaderComponent},
  {path:"FullScreen",component:ImageFullScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
