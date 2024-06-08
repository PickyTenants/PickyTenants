import { Component, Input } from '@angular/core';
import { PropertyDto } from '../../shared/service-proxies';

@Component({
  selector: 'app-related-reviews',
  templateUrl: './related-reviews.component.html',
  styleUrl: './related-reviews.component.scss'
})

export class RelatedReviewsComponent {
  @Input()
  public property: PropertyDto | undefined;
  x = 1;

  constructor() {
    
  }

  addReview(){
    
  }
}
