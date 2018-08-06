import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedFormsComponent } from './processed-forms.component';

describe('ProcessedFormsComponent', () => {
  let component: ProcessedFormsComponent;
  let fixture: ComponentFixture<ProcessedFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
