import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPcrsComponent } from './chart-pcrs.component';

describe('ChartPcrsComponent', () => {
  let component: ChartPcrsComponent;
  let fixture: ComponentFixture<ChartPcrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPcrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPcrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
