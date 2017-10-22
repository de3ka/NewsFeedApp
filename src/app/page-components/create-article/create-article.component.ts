import { Component, Input, trigger, state, transition, style, animate } from '@angular/core';
import { Article } from '../../_models';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService, UserService, ArticlesService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent{

  @Input() article: Article;

    constructor(
        private http: Http,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private articleService: ArticlesService
    ) {
        this.article = {
          title: '',
          content: '',
          image: '',
          category: '',
          postedBy: this.userService.getCurrentUser().username,
          comments: Array({ postedBy: '', content: '' })
        };
    }

    onSubmit() {
        this.articleService.createArticle(this.article)
            .subscribe(
            data => {
                this.alertService.success(`${this.article.title} added successful to articles list`, true);
                this.router.navigate(['/articles']);
                this.alertService.clear(3000);
            },
            error => {
                this.alertService.error(error);
            });
    }
}

