import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-localisation-form',
  templateUrl: './localisation-form.component.html',
  styleUrls: ['./localisation-form.component.css']
})
export class LocalisationFormComponent implements OnInit {

  // initialization and default data
  latitude: string = '48.85341';
  longitude: string = ' 2.3488';
  cityName: string = 'Paris';
  myLocOption = '1';
  displayView = false;

  constructor(
    // HttpClient to use the Geo Api from french government
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.onGeoLoc()

  }

  // method to launch getCitybyLocation() with latitude and longitude from the navigator
  onGeoLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.latitude = String(position.coords.latitude);
          this.longitude = String(position.coords.longitude);
          console.log("latitude: " + this.latitude);
          console.log("longitude: " + this.longitude);
          this.getCitybyLocation(this.latitude, this.longitude);
        }
      },
        (error: PositionError) => {
          console.log(error);
          alert("la géolocalisation n'est pas supportée par votre navigateur, Merci de choisir une autre option");
          this.getCitybyLocation(this.latitude, this.longitude);
        });
    } else {
      alert("Une erreur c'est produite");
      this.getCitybyLocation(this.latitude, this.longitude);
    }
  }

  // method to get latitude, longitude and cityName with the postCode
  onPostCode(form: NgForm) {
    console.log('retour formulaire :' + form.value.postCode);
    this.httpClient
      .get(`https://api-adresse.data.gouv.fr/search/?q=postcode=${form.value.postCode}&limit=1`)
      .subscribe(
        (response) => {
          this.longitude = response['features'][0]['geometry']['coordinates'][0];
          this.latitude = response['features'][0]['geometry']['coordinates'][1];
          this.cityName = response['features'][0]['properties']['city'];
          this.displayView = true;
        },
        (error) => {
          console.log('erreur : ' + error);
          alert("Une erreur s'est produite");
          this.displayView = true;
        }
      );
  }

  // method to launch the getCitybyLocation() with latitude and longitude from the form
  onGps(form: NgForm) {
    this.latitude = form.value.latitude;
    console.log(this.latitude);
    this.longitude = form.value.longitude;
    console.log(this.longitude);
    this.getCitybyLocation(this.latitude, this.longitude);
  }

  // method to get the cityName by latitude and longitude
  getCitybyLocation(lat: string, long: string) {
    this.httpClient
      .get(`https://api-adresse.data.gouv.fr/reverse/?lon=${long}&lat=${lat}`)
      .subscribe(
        (response) => {
          this.cityName = response['features'][0]['properties']['city'];
          console.log('ville :' + this.cityName);
          this.displayView = true;
        },
        (error) => {
          console.log('erreur : ' + error);
          alert("Une erreur s'est produite");
          this.displayView = false;
        }
      );
  }
}


