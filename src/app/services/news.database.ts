import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { ApiKey } from '../models/apikey.model';
import { Article } from '../models/article.model';
import { Country } from '../models/country.model';
import { v4 as uuidv4 } from 'uuid';

export const normalisedSearchText = (q: string) => q.trim().toLowerCase();

@Injectable()
export class NewsDB extends Dexie {

    private apiKey: Dexie.Table<ApiKey, string>;
    private countryList: Dexie.Table<Country, string>;
    private article: Dexie.Table<Article, string>;

    headers: HttpHeaders;
    queryParams: HttpParams;

    constructor(private http: HttpClient){
        super('newsDB');
        this.version(1).stores({
            apiKey: 'keyID',
            countryList: 'countryCode',
            article: 'articleID'
        });
        this.apiKey = this.table('apiKey');
        this.countryList = this.table('countryList');
        this.article = this.table('article');
    }

    getApiKey(): Promise<ApiKey>{
        return this.apiKey.get('1');
    }

    setApiKey(_apiKey: string){
        return this.apiKey.put({
            apiKey: _apiKey,
            keyID: '1'
        });
    }
    
    async getCountryList(): Promise<Country[]>{
        let _countryList: Country[] = await this.countryList.toArray();
        if(_countryList.length > 0) {
            return _countryList;
        } else {
            const _countryEndpoint:string = 'https://restcountries.eu/rest/v2/all';
            let results: Country[] = [];
    
            this.http.get<any>(_countryEndpoint).subscribe((response) => {
                response.map(c => {
                    results.push({
                        countryName: c.name,
                        countryCode: c.alpha2Code.toLowerCase(),
                        countryFlag: c.flag
                    });
                    this.countryList.add({
                        countryName: c.name,
                        countryCode: c.alpha2Code.toLowerCase(),
                        countryFlag: c.flag
                    });
                });
            });
            return results;
        }
    }

    getCountryNameFromCode(countryCode: string): Promise<Country>{
        return this.countryList.get(countryCode);
    }

    async getNewsList(countryCode: string): Promise<Article[]>{

        let _articlesCache: Article[] = await this.article.filter( a => a.articleCountry === countryCode ).toArray();

        if(_articlesCache.length > 0) {

            if((_articlesCache[0].saveTime.getTime() - (new Date()).getTime()) > 5*60*1000) {
                await this.article.clear();
                _articlesCache = await this.fetchNewsList(countryCode);
                _articlesCache.map( a => {
                    this.article.add(a);
                });

                return _articlesCache;
            } else {
                return _articlesCache;
            }

        } else {

            _articlesCache = this.fetchNewsList(countryCode);

            console.log(_articlesCache);

            console.log(_articlesCache[0]);

            return _articlesCache;
        }
    }

    fetchNewsList(countryCode: string): Article[]{
        let _articleList: Article[] = [];
        const _newsEndpoint:string = 'https://newsapi.org/v2/top-headlines';
        this.headers = new HttpHeaders().set('X-Api-Key','e0de3b76d40d43e4ad6a31c1f44a0173');
        this.queryParams = new HttpParams().set('country', countryCode);
        this.http.get<any>(_newsEndpoint, {params:this.queryParams, headers:this.headers}).toPromise().then(response=>{

            _articleList = response.articles.map(article => {
                _articleList.push({
                    sourceName: article.source.name,
                    author: article.author,
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    img: article.urlToImage,
                    publishTime: article.publishedAt,
                    content: article.content,
                    articleID: uuidv4(),
                    articleCountry: countryCode,
                    saveStatus: false,
                    saveTime: new Date()
                });
            });
        });
        return _articleList;
    }

}