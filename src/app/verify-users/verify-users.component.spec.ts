import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUsersComponent } from './verify-users.component';

describe('VerifyUsersComponent', () => {
  let component: VerifyUsersComponent;
  let fixture: ComponentFixture<VerifyUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyUsersComponent]
    });
    fixture = TestBed.createComponent(VerifyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
