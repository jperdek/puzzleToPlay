import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleChooserComponent } from './puzzle-chooser.component';

describe('PuzzleChooserComponent', () => {
  let component: PuzzleChooserComponent;
  let fixture: ComponentFixture<PuzzleChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
