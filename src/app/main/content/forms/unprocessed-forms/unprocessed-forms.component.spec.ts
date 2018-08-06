import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessedFormsComponent } from './unprocessed-forms.component';

describe('UnprocessedFormsComponent', () => {
  let component: UnprocessedFormsComponent;
  let fixture: ComponentFixture<UnprocessedFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprocessedFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprocessedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
