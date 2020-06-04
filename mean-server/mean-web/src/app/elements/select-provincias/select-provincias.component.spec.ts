import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProvinciasComponent } from './select-provincias.component';

describe('SelectProvinciasComponent', () => {
  let component: SelectProvinciasComponent;
  let fixture: ComponentFixture<SelectProvinciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProvinciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
