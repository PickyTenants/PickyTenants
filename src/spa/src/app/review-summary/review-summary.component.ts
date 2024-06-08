import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrl: './review-summary.component.scss'
})
export class ReviewSummaryComponent {
  constructor(private router:Router) {
  }

  navigate(){
    this.router.navigate(['review-details']);
  }
}
