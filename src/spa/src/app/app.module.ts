import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { TenantFeedbackServiceProxy, API_BASE_URL as api_url } from '../shared/service-proxies';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export function getRemoteServiceBaseUrl(): string {
  return 'http://localhost:5122';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: api_url, useFactory: getRemoteServiceBaseUrl },
    TenantFeedbackServiceProxy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
