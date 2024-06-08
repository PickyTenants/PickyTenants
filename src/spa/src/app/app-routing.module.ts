import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'review-details', component: ReviewDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
