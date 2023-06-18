import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from './../../interfaces/hero.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})

export class ListPageComponent implements OnInit{
  public heroes: Heroe[] = [];
  constructor ( private heroesService: HeroesService){}
  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes )
  }

}
