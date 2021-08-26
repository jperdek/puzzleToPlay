import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTemplateImageComponent } from './insert-template-image.component';

describe('InsertTemplateImageComponent', () => {
  let component: InsertTemplateImageComponent;
  let fixture: ComponentFixture<InsertTemplateImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTemplateImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTemplateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
