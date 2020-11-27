import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export const normalisedSearchText = (q: string) => q.trim().toLowerCase();

@Injectable()
export class NewsDB extends Dexie {

    private search: Dexie.Table<any, number>;

    constructor(){
        super('newsDB');
        this.version(1).stores({
            search: '++id,q'
        });
        this.search = this.table('search');
    }

    async saveSearch(searchEntry: Search): Promise<any>{
        
        const searchEntryTypeInNumber = searchEntry.type == Type.Anime ? 0 : 1;

        searchEntry.q = normalisedSearchText(searchEntry.q); 

        const result = await this.search.where('q').equals(searchEntry.q).and(c => c.type == searchEntryTypeInNumber).count();
        if(result <= 0){
            console.log(result);
            return this.search.add(searchEntry);
        }
    }

    getSearchOptions(): Promise<Search[]>{
        return this.search.orderBy('q').toArray();
    }

}