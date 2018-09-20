import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { addUserComponent } from './addUser.component';

describe('addUserComponent', () => {
  let component: addUserComponent;
  let fixture: ComponentFixture<addUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
