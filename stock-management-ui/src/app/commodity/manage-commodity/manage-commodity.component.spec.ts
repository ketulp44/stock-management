import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommodityComponent } from './manage-commodity.component';

describe('ManageCommodityComponent', () => {
  let component: ManageCommodityComponent;
  let fixture: ComponentFixture<ManageCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
