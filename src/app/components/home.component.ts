import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsDB } from '../services/news.database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiKeyStatus: boolean = false;
  apiKey: string;

  constructor(private newsDB: NewsDB, private router: Router) { }

  ngOnInit(): void {
    this.newsDB.getApiKey().then( response => {
      if(response){
        this.apiKey = response.apiKey;
        this.apiKeyStatus = true;
        this.router.navigate(['/country-list']);
      } else {
        this.router.navigate(['/config']);
      }
    })
  }

}
