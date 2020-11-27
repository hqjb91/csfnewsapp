import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';

@Injectable()
export class NewsService {
    constructor(private http:HttpClient){}

    getCountryList():Country[]{

        const endpoint:string = 'https://restcountries.eu/rest/v2/all';
        let results: Country[] = [];

        this.http.get<any>(endpoint).subscribe((response) => {
            response.map(c => {
                results.push({
                    countryName: c.name,
                    countryCode: c.alpha2Code,
                    countryFlag: c.flag
                });
            });
        });
        return results;
    }
}