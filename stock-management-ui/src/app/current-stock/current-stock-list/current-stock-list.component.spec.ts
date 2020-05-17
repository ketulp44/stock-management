import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockListComponent } from './current-stock-list.component';

describe('CurrentStockListComponent', () => {
  let component: CurrentStockListComponent;
  let fixture: ComponentFixture<CurrentStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
