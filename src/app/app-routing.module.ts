import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { BrowseComponent } from './components/browse/browse.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { MealplanComponent } from './components/mealplan/mealplan.component';
import { MyRecipesComponent } from './components/myrecipes/myrecipes.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';

// guards
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full'},
  { path: 'main', component: HomeComponent },
  { path: 'myrecipes', component: MyRecipesComponent, canActivate: [AuthGuard] },
  { path: 'create', component: RecipeformComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ShoppinglistComponent },
  { path: 'mealplan', component: MealplanComponent, canActivate: [AuthGuard] },
  { path: 'carousel', component: CarouselComponent },
  ]; 

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
