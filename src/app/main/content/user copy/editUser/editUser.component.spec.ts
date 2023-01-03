import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { editUserComponent } from './editUser.component';

describe('editUserComponent', () => {
  let component: editUserComponent;
  let fixture: ComponentFixture<editUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ editUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(editUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
