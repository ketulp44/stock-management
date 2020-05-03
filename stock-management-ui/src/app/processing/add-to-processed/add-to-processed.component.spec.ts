import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToProcessedComponent } from './add-to-processed.component';

describe('AddToProcessedComponent', () => {
  let component: AddToProcessedComponent;
  let fixture: ComponentFixture<AddToProcessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToProcessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
