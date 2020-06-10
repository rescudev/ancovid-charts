import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCCAAsComponent } from './chart-ccaas.component';

describe('ChartCCAAsComponent', () => {
  let component: ChartCCAAsComponent;
  let fixture: ComponentFixture<ChartCCAAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCCAAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCCAAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
