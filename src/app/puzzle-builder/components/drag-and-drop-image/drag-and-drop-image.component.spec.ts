import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropImageComponent } from './drag-and-drop-image.component';

describe('DragAndDropImageComponent', () => {
  let component: DragAndDropImageComponent;
  let fixture: ComponentFixture<DragAndDropImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
