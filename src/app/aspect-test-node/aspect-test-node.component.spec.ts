import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectTestNodeComponent } from './aspect-test-node.component';

describe('AspectTestNodeComponent', () => {
  let component: AspectTestNodeComponent;
  let fixture: ComponentFixture<AspectTestNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspectTestNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectTestNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
