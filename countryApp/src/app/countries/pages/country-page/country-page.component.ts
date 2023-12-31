import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesServices } from '../../services/countrie.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  constructor(
    private activatedRoute: ActivatedRoute,
    private countrieService: CountriesServices,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countrieService.searchCountryByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        return this.country =  country;
      })
  }
}
