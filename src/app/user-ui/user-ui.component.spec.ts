import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUIComponent } from './user-ui.component';

describe('UserUIComponent', () => {
  let component: UserUIComponent;
  let fixture: ComponentFixture<UserUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserUIComponent]
    });
    fixture = TestBed.createComponent(UserUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
