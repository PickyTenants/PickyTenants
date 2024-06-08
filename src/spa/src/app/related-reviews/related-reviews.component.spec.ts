import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedReviewsComponent } from './related-reviews.component';

describe('RelatedReviewsComponent', () => {
  let component: RelatedReviewsComponent;
  let fixture: ComponentFixture<RelatedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
