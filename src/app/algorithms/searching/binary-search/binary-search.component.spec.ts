import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinarySearchComponent } from './binary-search.component';

describe('BinarySearchComponent', () => {
  let component: BinarySearchComponent;
  let fixture: ComponentFixture<BinarySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinarySearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
