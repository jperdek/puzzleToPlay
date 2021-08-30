import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomManagementBottomSheetComponent } from './zoom-management-bottom-sheet.component';

describe('ZoomManagementBottomSheetComponent', () => {
  let component: ZoomManagementBottomSheetComponent;
  let fixture: ComponentFixture<ZoomManagementBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomManagementBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomManagementBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
