import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config.component';
import { CountryListComponent } from './components/country-list.component';
import { NewsListComponent } from './components/news-list.component';

import { NewsDB } from './services/news.database';
import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [
    AppComponent, ConfigComponent,
    CountryListComponent, NewsListComponent, HomeComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, CommonModule
  ],
  providers: [
    NewsDB
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
