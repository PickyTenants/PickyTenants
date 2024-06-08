import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewSummaryDto } from '../../shared/service-proxies';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrl: './review-summary.component.scss'
})
export class ReviewSummaryComponent {
  @Input()
  public review: ReviewSummaryDto | undefined;

  x = 1;
  constructor(private router: Router) {
  }


}
