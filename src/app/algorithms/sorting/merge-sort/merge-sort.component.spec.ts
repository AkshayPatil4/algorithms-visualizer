import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSortComponent } from './merge-sort.component';

describe('MergeSortComponent', () => {
  let component: MergeSortComponent;
  let fixture: ComponentFixture<MergeSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
