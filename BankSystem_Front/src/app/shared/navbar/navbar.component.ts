import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterService } from '../../service/user-register.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public myService:UserRegisterService){}
  logUser=sessionStorage.getItem("username");
  logIdUser=sessionStorage.getItem("userid");
  logIdAccount=sessionStorage.getItem("AccountId");
  isActive=sessionStorage.getItem("isSignedIn");
  
 
}
