import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config.component';
import { CountryListComponent } from './components/country-list.component';
import { NewsListComponent } from './components/news-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    CountryListComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
