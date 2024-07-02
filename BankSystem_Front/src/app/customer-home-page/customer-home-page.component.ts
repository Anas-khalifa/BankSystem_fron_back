import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterService } from '../service/user-register.service';

@Component({
  selector: 'app-customer-home-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './customer-home-page.component.html',
  styleUrl: './customer-home-page.component.css'
})
export class CustomerHomePageComponent implements OnInit {   public sessionStorage = sessionStorage;

  constructor(public myService:UserRegisterService){}
  logUser=sessionStorage.getItem("username");
  logIdUser=sessionStorage.getItem("userid");
  logIdAccount=sessionStorage.getItem("AccountId");
  role=sessionStorage.getItem("Role");

 formOp:  FormGroup = new FormGroup({
   currancy:new FormControl("JD"),
   amount:new FormControl(""),
   transactionType:new FormControl(""),

   fromCustomerId:new FormControl(""),
   toCustomerId:new FormControl(""),
   transferDate:new FormControl(""),

   finalDate:new FormControl("")
});
getusers(){debugger
 this.myService.GetAllUsers();
}
ngOnInit(): void {
 this.myService.GetAllUsers();
 this.myService.getBankAccount();

}

withdrawOperation(){
 const type="Withdraw"; 
  let accId=0;

 this.myService.AccountData.forEach((element:any) => {
   if(element.userId==this.logIdUser){
     accId=element.accountId;
   }
 });
 debugger
this.myService.addOperation(this.formOp.value,type,accId);
this.myService.updateBalance(this.formOp.value,accId,type);
}

depositOperation(){
 const type="Deposit";
 let accId=0;

 this.myService.AccountData.forEach((element:any) => {
   if(element.userId==this.logIdUser){
     accId=element.accountId;
   }
 });
 debugger
this.myService.addOperation(this.formOp.value,type,accId);
this.myService.updateBalance(this.formOp.value,accId,type);
}
transferOperation(){
 const type="CliQ";
 let accId=0;

 this.myService.AccountData.forEach((element:any) => {
   if(element.userId==this.logIdUser){
     accId=element.accountId;
   }
 });
 debugger
 this.myService.transferOperation(this.formOp.value,accId,type)
this.myService.updateBalance(this.formOp.value,accId,type);
}

billOperation(){
 const type="Bill Payment";
 let accId=0;

 this.myService.AccountData.forEach((element:any) => {
   if(element.userId==this.logIdUser){
     accId=element.accountId;
   }
 });
 debugger
this.myService.addOperation(this.formOp.value,type,accId);
this.myService.updateBalance(this.formOp.value,accId,type);
}

addLoan(){
const type="loan";
let accId=0;
this.myService.AccountData.forEach((element:any) => {
 if(element.userId==this.logIdUser){
   accId=element.accountId;
 }
});
this.myService.addLoan(this.formOp.value,type,accId);
// this.myService.updateBalance(this.formOp.value,accId,type);

}
}
