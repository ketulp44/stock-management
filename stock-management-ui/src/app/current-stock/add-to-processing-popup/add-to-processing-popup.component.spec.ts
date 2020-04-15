import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToProcessingPopupComponent } from './add-to-processing-popup.component';

describe('AddToProcessingPopupComponent', () => {
  let component: AddToProcessingPopupComponent;
  let fixture: ComponentFixture<AddToProcessingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToProcessingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToProcessingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
