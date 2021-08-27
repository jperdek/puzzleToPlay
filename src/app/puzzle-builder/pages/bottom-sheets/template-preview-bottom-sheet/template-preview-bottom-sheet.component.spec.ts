import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePreviewBottomSheetComponent } from './template-preview-bottom-sheet.component';

describe('TemplatePreviewBottomSheetComponent', () => {
  let component: TemplatePreviewBottomSheetComponent;
  let fixture: ComponentFixture<TemplatePreviewBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePreviewBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePreviewBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
