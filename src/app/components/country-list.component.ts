import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country.model';
import { NewsDB } from '../services/news.database';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryList: Country[];
  
  constructor(private newsDB: NewsDB) { }

  ngOnInit(): void {
    this.newsDB.getCountryList().then(response => {
      this.countryList = response;
    });

    
  }

}
