import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-heroe-page',
  templateUrl: './heroe-page.component.html',
  styles: [
  ]
})
export class HeroePageComponent implements OnInit {

  public heroe? : Heroe;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe (
        switchMap (({ id }) => this.heroesService.getHeroeById( id )  )
      )
      .subscribe( heroe => {
        if (!heroe) return this.router.navigate(['/hereoes/list']);
        this.heroe = heroe;
        console.log(this.heroe)
        return;
      })


  }

  goBack() {
    this.router.navigateByUrl('heroes/list');
  }

}
