import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './home/about/about.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeApproveComponent } from './employees/employee-approve/employee-approve.component';
import { LoginDeniedComponent } from './Error_handler/login-denied/login-denied.component';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';
import { OperationErrorComponent } from './Error_handler/operation-error/operation-error.component';
import { UserRegisterService } from './service/user-register.service';
import { PersonalInfoComponent } from './personal-info/personal-info.component';


export const routes: Routes = [
{
    path:'Home',
    component:HomeComponent
},
{
    path:'',
    component:HomeComponent
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'register',
    component:RegisterComponent
},
{
    path:'about',
    component:AboutComponent
},
{
    path:'customer',
    component:CustomerComponent,
    canActivate:[UserRegisterService]

},
{
    path:'employee',
    component:EmployeeComponent,
    canActivate:[UserRegisterService]

},
{
    path:'employeeApprove',
    component:EmployeeApproveComponent,
    canActivate:[UserRegisterService]

},
{
    path:'Denied',
    component:LoginDeniedComponent
},
{
    path:'cHomePage',
    component:CustomerHomePageComponent,
    canActivate:[UserRegisterService]

},
{
    path:'operationError',
    component:OperationErrorComponent,
    canActivate:[UserRegisterService]

},
{
    path:'MyAccount',
    component:PersonalInfoComponent,
    canActivate:[UserRegisterService]

}

];
