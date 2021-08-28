import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomManagementComponent } from './zoom-management.component';

describe('ZoomManagementComponent', () => {
  let component: ZoomManagementComponent;
  let fixture: ComponentFixture<ZoomManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
