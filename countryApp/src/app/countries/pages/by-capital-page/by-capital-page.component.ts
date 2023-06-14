import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesServices } from '../../services/countrie.service';
import { Subscriber } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string="";
  constructor(private countriesServices: CountriesServices) { }

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCapital.countries;
    this.initialValue = this.countriesServices.cacheStore.byCapital.term;
  }

  public isLoading: boolean = false;

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesServices.searchCapital(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
      this.initialValue = term;
    });

  }

}
