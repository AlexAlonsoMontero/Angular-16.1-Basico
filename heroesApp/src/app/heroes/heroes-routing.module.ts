import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroePageComponent } from './pages/heroe-page/heroe-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: '', // en este caso la cadena vascía carga localhost:4200/heroes
    component: LayoutPageComponent,
    children:[
      { path:'new-heroe',   component: NewPageComponent },
      { path:'search',      component: SearchPageComponent },
      { path:'edit/:id',    component: NewPageComponent },
      { path:'list',        component: ListPageComponent },
      { path:':id',         component: HeroePageComponent },
      { path:'**', redirectTo: 'list' },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
