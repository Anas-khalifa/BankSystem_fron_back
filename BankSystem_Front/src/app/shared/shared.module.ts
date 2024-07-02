import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,NavbarComponent,FooterComponent
  ],
  exports:[
    NavbarComponent,FooterComponent
  ]
})
export class SharedModule { }
