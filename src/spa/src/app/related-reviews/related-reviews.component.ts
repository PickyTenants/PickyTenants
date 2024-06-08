import { Component, Input } from '@angular/core';
import { PropertyDto, ReviewSummaryDto } from '../../shared/service-proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-reviews',
  templateUrl: './related-reviews.component.html',
  styleUrl: './related-reviews.component.scss'
})

export class RelatedReviewsComponent {
  @Input()
  public property: PropertyDto | undefined;
  x = 1;

  constructor(private router: Router) {

  }

  addReview() {
    this.router.navigate(['/review-details'], { queryParams: { action: 'new', identifier: this.property?.id } });
  }

  showDetails(review: ReviewSummaryDto) {
    this.router.navigate(['/review-details'], { queryParams: { action: 'details', id: review.id } });
  }
}
