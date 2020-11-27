import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article.model';
import { NewsDB } from '../services/news.database';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  countryCode:string = '';
  countryName:string = '';
  newsList:Article[] = [];

  constructor(private activatedRoute: ActivatedRoute, private newsDB: NewsDB, private router:Router) { }

  ngOnInit(): void {

    // this.countryCode = this.activatedRoute.snapshot.params.countryCode;
    this.activatedRoute.paramMap.subscribe( response => {
      //@ts-ignore
      this.countryCode = response.params.countryCode;
    });

    this.newsDB.getCountryNameFromCode(this.countryCode).then( response => {
      this.countryName = response.countryName;
    });

    this.newsDB.getNewsList(this.countryCode).then( response => {
      this.newsList = response;
    });
  }

  goBack(){
    this.router.navigate(['/country-list']);
  }
}
