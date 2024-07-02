import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDeniedComponent } from './login-denied.component';

describe('LoginDeniedComponent', () => {
  let component: LoginDeniedComponent;
  let fixture: ComponentFixture<LoginDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDeniedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
