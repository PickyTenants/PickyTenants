import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.scss'
})
export class ReviewDetailsComponent {
  identifier: string|number|undefined = undefined;
  title:string|undefined = undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.identifier = params['id'];
      if(this.identifier == 'new') {
        this.title = 'New Review';
      }else{
        this.title = 'Show Review';
      }
    });
  }
}
