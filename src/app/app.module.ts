import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyrecipesComponent } from './components/myrecipes/myrecipes.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';

import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrowseComponent,
    RecipeComponent,
    CalendarComponent,
    MyrecipesComponent,
    RecipeformComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

