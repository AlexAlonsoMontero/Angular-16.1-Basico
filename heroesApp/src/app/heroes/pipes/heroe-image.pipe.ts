import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroeImage'
})
export class HeroeImagePipe implements PipeTransform {

  transform(hereoe: Heroe,): string {
    if (!hereoe.id && !hereoe.alt_img) {
      return 'assets/no-image.png'
    }

    if (hereoe.alt_img) return hereoe.alt_img;

    return `assets/heroes/${hereoe.id}.jpg`;
  }
}
