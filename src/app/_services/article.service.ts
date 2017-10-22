import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticlesService {
    private url: string = 'http://localhost:3000/api/articles';

    constructor(private http: Http) { }

    createArticle(article) {
        return this.http.post(this.url, article)
            .map((res: Response) => res.json());
    }

    getAllArticles() {
        return this.http.get(this.url)
            .map((res: Response) => res.json());
    }

     getArticleById(articleID) {
        return this.http.get(this.url + '/' + articleID)
            .map((res: Response) => res.json());
    }

    getArticleByTitle(title){
        return this.http.get(this.url + '/' + title)
            .map((res: Response) => res.json());
    }

    addCommentToArticle(title, comment){
         let route= this.url + '/' + title;
         return this.http.post(route, comment)
            .map((res: Response) => res.json());
    }
    
     updateArticle(article) {
        return this.http.put(this.url, article)
            .map((res: Response) => res.json());
    }

    deleteArticle(articleID) {
        return this.http.delete(this.url + '/' + articleID)
            .map((res: Response) => res.json());
    }
}
