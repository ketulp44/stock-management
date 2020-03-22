import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardStockListComponent } from './inward-stock-list.component';

describe('InwardStockListComponent', () => {
  let component: InwardStockListComponent;
  let fixture: ComponentFixture<InwardStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InwardStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
