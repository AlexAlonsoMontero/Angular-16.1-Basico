import { Heroe } from './../../interfaces/hero.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

    @Input()
    public heroe!: Heroe;

    ngOnInit(): void {
      if ( !this.heroe ) throw Error ('Hero property is required');
    }
}
