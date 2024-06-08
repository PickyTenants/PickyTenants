import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  private autocomplete!: google.maps.places.Autocomplete;

  constructor(private ngZone: NgZone) {}

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
