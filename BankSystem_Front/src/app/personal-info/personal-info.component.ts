import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterService } from '../service/user-register.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule,MatDialogModule,
    MatDialogActions, MatDialogClose, MatDialogContent,
     MatDialogModule, MatDialogTitle],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  constructor(public myService:UserRegisterService){}

  ngOnInit() {
    this.myService.GetAllUsers();
  }
  logUser=sessionStorage.getItem("username");
  logIdUser=sessionStorage.getItem("userid");
  logIdAccount=sessionStorage.getItem("AccountId");
  role=sessionStorage.getItem("Role");
  formUser:  FormGroup = new FormGroup({
      Fullname:new FormControl(""),
      Age:new FormControl(""),
      Address:new FormControl(""),
      PhoneNumber:new FormControl(""),
      Gender:new FormControl(""),
      RoleName:new FormControl(""),
      Access:new FormControl(""),
      Pass:new FormControl(""),
      Username:new FormControl(""),
  
  })
  
  RegisterNewUser(){
    debugger
    this.myService.UpdateUser(this.formUser.value,this.logIdUser);
  }
  
}
