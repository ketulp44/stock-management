import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingListComponent } from './processing-list.component';

describe('ProcessingListComponent', () => {
  let component: ProcessingListComponent;
  let fixture: ComponentFixture<ProcessingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
