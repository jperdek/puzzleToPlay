import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectTestNode2Component } from './aspect-test-node2.component';

describe('AspectTestNode2Component', () => {
  let component: AspectTestNode2Component;
  let fixture: ComponentFixture<AspectTestNode2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspectTestNode2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectTestNode2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
