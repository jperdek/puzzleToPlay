import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleBuilderComponent } from './puzzle-builder.component';

describe('PuzzleBuilderComponent', () => {
  let component: PuzzleBuilderComponent;
  let fixture: ComponentFixture<PuzzleBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
