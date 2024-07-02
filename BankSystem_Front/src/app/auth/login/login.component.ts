import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRegisterService } from '../../service/user-register.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(public myService:UserRegisterService){}
  

  
  formUser:  FormGroup = new FormGroup({
    Fullname:new FormControl("string"),
    Age:new FormControl("0"),
    Address:new FormControl("string"),
    PhoneNumber:new FormControl("string"),
    Gender:new FormControl("string"),
    RoleName:new FormControl("string"),
    Access:new FormControl("true"),
    Pass:new FormControl(""),
    Username:new FormControl(""),

})

  LoginUser(){    
    this.myService.GetAllUsers();

    this.myService.LoginUserGet(this.formUser.value);
    this.myService.getBankAccount()

  }

}
