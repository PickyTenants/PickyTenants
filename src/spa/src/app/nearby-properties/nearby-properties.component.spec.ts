import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPropertiesComponent } from './nearby-properties.component';

describe('NearbyPropertiesComponent', () => {
  let component: NearbyPropertiesComponent;
  let fixture: ComponentFixture<NearbyPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearbyPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearbyPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
