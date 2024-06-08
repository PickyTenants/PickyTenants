import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { TenantFeedbackServiceProxy, API_BASE_URL as api_url } from '../shared/service-proxies';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SearchComponent } from './search/search.component';
import { ReviewSummaryComponent } from './review-summary/review-summary.component';
import { NearbyPropertiesComponent } from './nearby-properties/nearby-properties.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { RelatedReviewsComponent } from './related-reviews/related-reviews.component';

export function getRemoteServiceBaseUrl(): string {
  return 'http://localhost:5122';
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ReviewSummaryComponent,
    NearbyPropertiesComponent,
    ReviewDetailsComponent,
    RelatedReviewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    RatingModule.forRoot(),
  ],
  providers: [
    { provide: api_url, useFactory: getRemoteServiceBaseUrl },
    TenantFeedbackServiceProxy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
