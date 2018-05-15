import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MyrecipesComponent } from './components/myrecipes/myrecipes.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { CalendarComponent } from './components/calendar/calendar.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'recipes', component: MyrecipesComponent},
  { path: 'create', component: RecipeformComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'calendar', component: CalendarComponent },
  ]; 

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
