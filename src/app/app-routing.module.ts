import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MyRecipesComponent } from './components/myrecipes/myrecipes.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {ProfileComponent} from "./components/profile/profile.component";
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { MealplanComponent } from './components/mealplan/mealplan.component';

import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'},
  { path: 'main', component: HomeComponent},
  { path: 'myrecipes', component: MyRecipesComponent},
  { path: 'create', component: RecipeformComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ShoppinglistComponent },
  { path: 'mealplan', component: MealplanComponent },
  ];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
