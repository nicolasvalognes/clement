import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-meteo-view',
  templateUrl: './meteo-view.component.html',
  styleUrls: ['./meteo-view.component.css']
})
export class MeteoViewComponent implements OnInit {

  @Input() viewCityName: string;
  @Input() viewLatitude: string;
  @Input() viewLongitude: string;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  // method to have a dynamic src in the iframe tag
  getSafeUrl(lat, long) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=' + lat + ',' + long + '&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=BhxRRg9xV3VTflFmUyVXflQ8ATQAdgYhBHgEZ104USxUP1Q1AmJRN14wB3oPIAUzVXhTMA80CDgLYAd%2FAHJQMQZsUT0PZFcwUzxRNFN8V3xUegFgACAGIQRvBGFdLlEwVDRUOQJ%2FUTBeNwd7Dz4FMVVlUywPLwgxC20HaABlUDIGYFE2D29XNlM1USxTfFdmVDIBMAA2BjoENQQ1XWJRMlQwVGUCZlEwXjcHew89BTVVblMzDzIINQtrB2MAclAsBhxRRg9xV3VTflFmUyVXflQyAT8Aaw%3D%3D&_c=06221b02bc522918238ccdb78c58d54c')
  }

}
