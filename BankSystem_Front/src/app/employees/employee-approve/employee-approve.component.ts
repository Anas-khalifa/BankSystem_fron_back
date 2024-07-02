import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../../service/user-register.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-approve',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './employee-approve.component.html',
  styleUrl: './employee-approve.component.css'
})
export class EmployeeApproveComponent implements OnInit {
  constructor(public myService:UserRegisterService){}
  
  ngOnInit(): void {
    this.myService.getUser();
    this.myService.AllUserData();
    this.myService.getBankAccount();
  }


  admitBtn(id:number,uuser:any){
    this.myService.admitUser(id)
    this.myService.editRole(uuser);
  }

  remove(userId:any){
    this.myService.removeUser(userId);
  }

}
