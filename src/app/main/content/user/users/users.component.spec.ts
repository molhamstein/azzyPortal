import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { usersComponent } from './users.component';

describe('usersComponent', () => {
  let component: usersComponent;
  let fixture: ComponentFixture<usersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ usersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(usersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
