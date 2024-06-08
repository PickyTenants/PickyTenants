import { Component } from '@angular/core';
import { TenantFeedbackServiceProxy } from '../shared/service-proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spa';


  constructor(private tsp: TenantFeedbackServiceProxy
    , private router: Router) {

  }

  home() {
    this.router.navigate(['']);
  }

}
