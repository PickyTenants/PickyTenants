import { Component } from '@angular/core';
import { TenantFeedbackServiceProxy } from '../shared/service-proxies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spa';


  constructor(private tsp: TenantFeedbackServiceProxy) {
    
  }

  addReview() {
    this.tsp.addReview().subscribe(data => {
      console.log(data);
    });
  }

  searchReviews() {
    this.tsp.searchReviews().subscribe(data => {
      console.log(data);
    });
  }
}
