import { Heroe } from './../../interfaces/hero.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {


  public heroeForm = new FormGroup({
    superhero:        new FormControl<string>(''),
    id:               new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),

  });
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor (
      private heroesService:HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ){}

  get currentHeroe(): Heroe {
    const heroe = this.heroeForm.value as Heroe;

    return heroe
  }


  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroeById( id ) )

        // switchMap( ({id} => this.heroesService.getHeroeById( id ) )
      )
      .subscribe( heroe => {
        if (!heroe) return this.router.navigateByUrl('/');
        this.heroeForm.reset( heroe  );
        return;
      })

  }


  onSubmit():void {

    if ( this.heroeForm.invalid ) {
      return;
    };

    // SI TIENE ID ACUTALIZO
    if ( this.currentHeroe.id  ){

      this.heroesService.updateHeroe( this.currentHeroe )
        .subscribe( heroe => {
          //TODO: mostrar snackbar
          return;
        });
      }
    //SINO TIENE ID AÑADO
    this.heroesService.addHeroe( this.currentHeroe )
        .subscribe( heroe => {
        //TODO: mostrar snackbar
        })


    // this.heroesService.updateHeroe( this.heroeForm.value );

  }
}
