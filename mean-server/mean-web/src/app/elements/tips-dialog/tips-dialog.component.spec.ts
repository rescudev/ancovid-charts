import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsDialogComponent } from './tips-dialog.component';

describe('TipsDialogComponent', () => {
  let component: TipsDialogComponent;
  let fixture: ComponentFixture<TipsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
