import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryBottomSheetComponent } from './gallery-bottom-sheet.component';

describe('GalleryBottomSheetComponent', () => {
  let component: GalleryBottomSheetComponent;
  let fixture: ComponentFixture<GalleryBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
