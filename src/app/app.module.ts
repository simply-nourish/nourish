import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { MaterializeModule } from 'angular2-materialize';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {SlideshowModule} from 'ng-simple-slideshow';


import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyrecipesComponent } from './components/myrecipes/myrecipes.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { MealplanComponent } from './components/mealplan/mealplan.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RecipeService } from './services/recipe.service';
import { IngredientService } from './services/ingredient.service';
import { DietaryRestrictionService } from './services/dietary-restriction.service';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrowseComponent,
    RecipeComponent,
    CalendarComponent,
    MyrecipesComponent,
    RecipeformComponent,
    HomepageComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    ShoppinglistComponent,
    MealplanComponent,
    SidenavComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MaterialAppModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterializeModule,
    FormsModule, 
    CalendarModule.forRoot(),
    SlideshowModule,
  ],
  providers: [Angular2TokenService, AuthService, AuthGuard, BrowseComponent, RecipeService, IngredientService, DietaryRestrictionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

