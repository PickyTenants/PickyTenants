import { Component, OnInit, NgZone } from '@angular/core';
import { PropertyDto, SearchPropertyDto, TenantFeedbackServiceProxy } from '../../shared/service-proxies';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  private autocomplete!: google.maps.places.Autocomplete;

  public property!: PropertyDto;

  constructor(private ngZone: NgZone, 
    private tsp: TenantFeedbackServiceProxy) { }

  ngOnInit(): void {
    this.initAutocomplete();
  }

  private initAutocomplete(): void {
    const input = document.getElementById('address') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'nz' }
    });

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => this.onPlaceChanged());
    });
  }

  private onPlaceChanged(): void {
    const place = this.autocomplete.getPlace();
    var dto = new SearchPropertyDto();
    dto.lat = 1; //place?.geometry?.location?.lat() ?? -1 ;
    dto.lng = 1; //place?.geometry?.location?.lng() ?? -1 ;
    dto.address = place?.formatted_address ?? '';
    dto.postalCode = place?.address_components?.find(x => x.types.includes('postal_code'))?.long_name ?? '';
    dto.street = place?.address_components?.find(x => x.types.includes('route'))?.long_name ?? '';
    dto.streetNumber = parseInt(place?.address_components?.find(x => x.types.includes('street_number'))?.long_name ?? '-1');
    dto.suburb = place?.address_components?.find(x => x.types.includes('sublocality'))?.long_name ?? '';
    dto.unitNumber = parseInt(place?.address_components?.find(x => x.types.includes('subpremise'))?.long_name ?? '-1');
    dto.country = place?.address_components?.find(x => x.types.includes('country'))?.long_name ?? '';
    this.tsp.searchReviews(dto).subscribe(data => {
      this.property = data;
    });
  }

}
