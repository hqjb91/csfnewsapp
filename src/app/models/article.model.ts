export interface Article {
    sourceName: string;
    author: string;
    title: string;
    description: string;
    url: string;
    img: string;
    publishTime: Date;
    content: string;
    articleID: string;
    articleCountry: string;
    saveStatus: boolean;
    saveTime: Date;
}