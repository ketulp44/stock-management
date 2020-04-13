import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToProcessingFormComponent } from './add-to-processing-form.component';

describe('AddToProcessingFormComponent', () => {
  let component: AddToProcessingFormComponent;
  let fixture: ComponentFixture<AddToProcessingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToProcessingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToProcessingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
