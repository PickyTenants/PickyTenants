import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReviewDto, ReviewDetailsDto, TenantFeedbackServiceProxy } from '../../shared/service-proxies';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.scss'
})
export class ReviewDetailsComponent {
  title: string | undefined = undefined;
  action: string | undefined = undefined;
  identifier: number = -1;
  reviewDetails: ReviewDetailsDto = new ReviewDetailsDto();

  constructor(private route: ActivatedRoute
    , private router: Router
    , private tsp: TenantFeedbackServiceProxy) {
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.identifier = params['identifier'];
      if (this.action == 'new') {
        this.title = 'New Review';
        this.reviewDetails = new ReviewDetailsDto();
      } else {
        this.title = 'Show Review';
        if (this.identifier) {
          this.tsp.getReviewDetails(this.identifier).subscribe(data => {
            console.log(data);
            this.reviewDetails = data;
          });
        }
      }
    });
  }


  sendReview() {
    var dto = new AddReviewDto();
    dto.propertyId = this.identifier?? -1;
    dto.review = this.reviewDetails;
    this.tsp.addReview(dto).subscribe(data => {
      console.log(data);
    });
  }
}
