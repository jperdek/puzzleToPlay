import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectTestComponent } from './aspect-test.component';

describe('AspectTestComponent', () => {
  let component: AspectTestComponent;
  let fixture: ComponentFixture<AspectTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspectTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
