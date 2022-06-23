import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAopTestComponent } from './to-aop-test.component';

describe('ToAopTestComponent', () => {
  let component: ToAopTestComponent;
  let fixture: ComponentFixture<ToAopTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToAopTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAopTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
