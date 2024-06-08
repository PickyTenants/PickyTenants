import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrl: './review-summary.component.scss'
})
export class ReviewSummaryComponent {
 
  x = 1;
  constructor(private router:Router) {
  }

 
}
