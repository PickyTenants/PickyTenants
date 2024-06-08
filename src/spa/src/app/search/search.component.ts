import { Component, OnInit, NgZone } from '@angular/core';
import { PropertyDto, SearchPropertyDto, TenantFeedbackServiceProxy } from '../../shared/service-proxies';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  private autocomplete!: google.maps.places.Autocomplete;

  private property!: PropertyDto;

  constructor(private ngZone: NgZone, private tsp:TenantFeedbackServiceProxy) {}

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
    console.log(place);
    var dto = new SearchPropertyDto();
    dto.lat = place?.geometry?.location?.lat() ?? -1 ;
    dto.lng = place?.geometry?.location?.lng() ?? -1 ;
    dto.address = place?.formatted_address ?? '';
    dto.postalCode = place?.address_components?.find(x => x.types.includes('postal_code'))?.long_name ?? '';
    dto.street = place?.address_components?.find(x => x.types.includes('route'))?.long_name ?? '';
    dto.streetNumber = parseInt(place?.address_components?.find(x => x.types.includes('street_number'))?.long_name ?? '-1');
    dto.suburb = place?.address_components?.find(x => x.types.includes('sublocality'))?.long_name ?? '';
    dto.unitNumber = parseInt(place?.address_components?.find(x => x.types.includes('subpremise'))?.long_name ?? '-1');
    
    this.tsp.searchReviews(dto).subscribe(data => {
      console.log(data);
      this.property = data;
    });
    // this.displayPlaceDetails(place);
  }

  // private displayPlaceDetails(place: google.maps.places.PlaceResult): void {
  //   const resultsDiv = document.getElementById('results') as HTMLDivElement;
  //   resultsDiv.innerHTML = ''; // Clear previous results

  //   const resultItem = document.createElement('div');
  //   resultItem.className = 'result-item';

  //   if (place.name) {
  //     resultItem.innerHTML += `<strong>Name:</strong> ${place.name}<br>`;
  //   }

  //   if (place.formatted_address) {
  //     resultItem.innerHTML += `<strong>Address:</strong> ${place.formatted_address}<br>`;
  //   }

  //   if (place.geometry && place.geometry.location) {
  //     resultItem.innerHTML += `<strong>Location:</strong> ${place.geometry.location.lat()}, ${place.geometry.location.lng()}<br>`;
  //   }

  //   if (place.types) {
  //     resultItem.innerHTML += `<strong>Types:</strong> ${place.types.join(', ')}<br>`;
  //   }

  //   if (place.website) {
  //     resultItem.innerHTML += `<strong>Website:</strong> <a href="${place.website}" target="_blank">${place.website}</a><br>`;
  //   }

  //   if (place.photos && place.photos.length > 0) {
  //     const photoUrl = place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 });
  //     resultItem.innerHTML += `<strong>Photo:</strong><br><img src="${photoUrl}" alt="Place photo"><br>`;
  //   }

  //   resultsDiv.appendChild(resultItem);
  // }
}
