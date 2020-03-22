import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCommodityComponent } from './add-sub-commodity.component';

describe('AddSubCommodityComponent', () => {
  let component: AddSubCommodityComponent;
  let fixture: ComponentFixture<AddSubCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
