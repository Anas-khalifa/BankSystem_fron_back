import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { UserRegisterService } from '../../service/user-register.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule,MatDialogModule,
    MatDialogActions, MatDialogClose, MatDialogContent,
     MatDialogModule, MatDialogTitle ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [provideNativeDateAdapter()]

})
export class RegisterComponent {
constructor(public myService:UserRegisterService){}

formUser:  FormGroup = new FormGroup({
    Fullname:new FormControl(""),
    Age:new FormControl(""),
    Address:new FormControl(""),
    PhoneNumber:new FormControl(""),
    Gender:new FormControl(""),
    RoleName:new FormControl(""),
    Access:new FormControl("false"),
    Pass:new FormControl(""),
    Username:new FormControl(""),

})

RegisterNewUser(){
  debugger
  this.myService.CreateNewUser(this.formUser.value);
}

}
