import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ConfigComponent } from './components/config.component';
import { CountryListComponent } from './components/country-list.component';
import { NewsListComponent } from './components/news-list.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'config', component: ConfigComponent},
  {path:'country-list', component: CountryListComponent},
  {path:'news-list/:countryCode', component: NewsListComponent},
  {path:'**', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
