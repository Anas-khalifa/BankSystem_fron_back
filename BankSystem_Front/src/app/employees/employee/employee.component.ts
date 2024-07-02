import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../../service/user-register.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(public myService:UserRegisterService){}


  ngOnInit(): void {
    this.myService.getUser();
    this.myService.getBankAccount();
    this.myService.GetAllUsers();
  }


  
  AcceptLoan(id:number,user:any,accId:number){

    this.myService.admitLoan(id);
    // this.myService.updateBalance(user,accId,"loan")
    
  }

  RejectLoan(userId:any){
    this.myService.removeLoan(userId);
  }

}
