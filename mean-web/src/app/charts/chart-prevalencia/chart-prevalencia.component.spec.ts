import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPrevalenciaComponent } from './chart-prevalencia.component';

describe('ChartPrevalenciaComponent', () => {
  let component: ChartPrevalenciaComponent;
  let fixture: ComponentFixture<ChartPrevalenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPrevalenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPrevalenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
