import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUciComponent } from './chart-uci.component';

describe('ChartUciComponent', () => {
  let component: ChartUciComponent;
  let fixture: ComponentFixture<ChartUciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartUciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartUciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
