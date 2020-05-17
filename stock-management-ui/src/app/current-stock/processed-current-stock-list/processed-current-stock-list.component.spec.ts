import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedCurrentStockListComponent } from './processed-current-stock-list.component';

describe('ProcessedCurrentStockListComponent', () => {
  let component: ProcessedCurrentStockListComponent;
  let fixture: ComponentFixture<ProcessedCurrentStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedCurrentStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedCurrentStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
