import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockistUiComponent } from './stockist-ui.component';

describe('StockistUiComponent', () => {
  let component: StockistUiComponent;
  let fixture: ComponentFixture<StockistUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockistUiComponent]
    });
    fixture = TestBed.createComponent(StockistUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
