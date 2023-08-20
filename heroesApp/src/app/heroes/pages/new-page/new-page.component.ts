import { Heroe } from './../../interfaces/hero.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public heroeForm = new FormGroup({
    superhero: new FormControl<string>(''),
    id: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHeroe(): Heroe {
    const heroe = this.heroeForm.value as Heroe;

    return heroe;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id))

        // switchMap( ({id} => this.heroesService.getHeroeById( id ) )
      )
      .subscribe((heroe) => {
        if (!heroe) return this.router.navigateByUrl('/');
        this.heroeForm.reset(heroe);
        return;
      });
  }

  onSubmit(e: Event): void {
    e.stopPropagation();
    if (this.heroeForm.invalid) {
      return;
    }

    // SI TIENE ID ACUTALIZO
    if (this.currentHeroe.id) {
      this.heroesService.updateHeroe(this.currentHeroe).subscribe((heroe) => {
        this.showSnackBar(`${heroe.superhero} Actualizado!`);
        return;
      });
    } else {
      this.heroesService.addHeroe(this.currentHeroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/edit', heroe.id]);
        this.showSnackBar(`${heroe.superhero} Creado!`);
      });
    }
    //SINO TIENE ID AÑADO

    // this.heroesService.updateHeroe( this.heroeForm.value );
  }

  onDeleteHeroe() {
    if (!this.currentHeroe.id) throw Error('El id del heroe es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroeForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => {
          return this.heroesService.deleteHeroeById(this.currentHeroe.id);
        }),
        filter((wasDeleted: boolean) => wasDeleted),
        tap((wasDeleted) => console.log({ wasDeleted }))
      )
      .subscribe((result) => {
        this.router.navigate(['/heroes']);
      });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (!result) return;

    //   this.heroesService
    //     .deleteHeroeById(this.currentHeroe.id)
    //     .subscribe((wasDeleted) => {
    //       if (wasDeleted) this.router.navigate(['/heroes']);
    //     });
    // });
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
