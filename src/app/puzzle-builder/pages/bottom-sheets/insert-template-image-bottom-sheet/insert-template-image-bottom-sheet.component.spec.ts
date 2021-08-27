import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTemplateImageBottomSheetComponent } from './insert-template-image-bottom-sheet.component';

describe('InsertTemplateImageBottomSheetComponent', () => {
  let component: InsertTemplateImageBottomSheetComponent;
  let fixture: ComponentFixture<InsertTemplateImageBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTemplateImageBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTemplateImageBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
