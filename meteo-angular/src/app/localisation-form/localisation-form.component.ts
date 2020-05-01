import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-localisation-form',
  templateUrl: './localisation-form.component.html',
  styleUrls: ['./localisation-form.component.css']
})
export class LocalisationFormComponent implements OnInit {

  city: string = "Paris";
  latitude: string;
  longitude: string;
  cityName: string;
  myLocOption = '1';
  displayView = false;

  apiData: any[];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

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
        (error: PositionError) => console.log(error));
    } else {
      alert("la géolocalisation n'est pas supportée par votre navigateur, Merci de choisir une autre option");
    }
    this.displayView = true;
   
  }

  onPostCode(form: NgForm) {
    console.log('retour formulaire :' + form.value.postCode);
    this.httpClient
      .get(`https://api-adresse.data.gouv.fr/search/?q=postcode=${form.value.postCode}&limit=1`)
      .subscribe(
        (response) => {
          console.log(response['features'][0]['geometry']['coordinates']);
          this.longitude = response['features'][0]['geometry']['coordinates'][0];
          this.latitude = response['features'][0]['geometry']['coordinates'][1];
          this.cityName = response['features'][0]['properties']['city'];
          console.log('longitude : ' + this.longitude);
          console.log('latitude : ' + this.latitude);
          console.log('city : ' + this.cityName);
        },
        (error) => {
          console.log('erreur : ' + error);
        }
      );
    this.displayView = true;
  }

  onGps(form: NgForm) {
    this.latitude = form.value.latitude;
    console.log(this.latitude);
    this.longitude = form.value.longitude;
    console.log(this.longitude);
    this.getCitybyLocation(this.latitude, this.longitude);
    this.displayView = true;
  }

  getCitybyLocation(lat: string, long: string) {
    this.httpClient
      //5.897897 45.577716
      .get(`https://api-adresse.data.gouv.fr/reverse/?lon=${long}&lat=${lat}`)
      .subscribe(
        (response) => {
          if (typeof(response['features'][0]['properties']) === 'undefined') {
             console.log('Les données saisies ne renvoient rien');
          } else {
            this.cityName = response['features'][0]['properties']['city'];
            console.log('ville :' + this.cityName);
          }
        },
        (error) => {
          console.log('erreur : ' + error);
          alert("les données saisies ne renvoient rien");
        }
      );
  }
}


