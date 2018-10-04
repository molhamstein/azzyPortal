import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { cancelAppointmentComponent } from './cancel-appointment.component';

describe('cancelAppointmentComponent', () => {
  let component: cancelAppointmentComponent;
  let fixture: ComponentFixture<cancelAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ cancelAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(cancelAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
