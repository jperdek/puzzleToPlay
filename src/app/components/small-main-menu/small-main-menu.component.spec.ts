import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMainMenuComponent } from './small-main-menu.component';

describe('SmallMainMenuComponent', () => {
  let component: SmallMainMenuComponent;
  let fixture: ComponentFixture<SmallMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
