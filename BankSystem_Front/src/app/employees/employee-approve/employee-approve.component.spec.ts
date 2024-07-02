import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeApproveComponent } from './employee-approve.component';

describe('EmployeeApproveComponent', () => {
  let component: EmployeeApproveComponent;
  let fixture: ComponentFixture<EmployeeApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeApproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
