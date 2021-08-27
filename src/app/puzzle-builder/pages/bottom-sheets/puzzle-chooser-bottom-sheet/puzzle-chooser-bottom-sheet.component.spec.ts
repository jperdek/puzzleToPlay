import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleChooserBottomSheetComponent } from './puzzle-chooser-bottom-sheet.component';

describe('PuzzleChooserBottomSheetComponent', () => {
  let component: PuzzleChooserBottomSheetComponent;
  let fixture: ComponentFixture<PuzzleChooserBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleChooserBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleChooserBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
