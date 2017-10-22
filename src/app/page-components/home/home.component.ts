import { Component, OnInit, Input, transition, state, trigger, style, animate } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../_models';
import { ArticlesService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @Input() articles: Article[];
    constructor(
        private http: Http,
        private articlesService: ArticlesService,
        private authService: AuthenticationService
    ) {
        this.articles = [];
    }
    ngOnInit() {
        this.articlesService.getAllArticles()
            .subscribe(articlesJson => this.articles.push(...articlesJson));
    }


    get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
