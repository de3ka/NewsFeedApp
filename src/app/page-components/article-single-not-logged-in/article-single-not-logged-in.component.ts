import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../_models';
import { ArticlesService, AlertService, UserService } from '../../_services';

@Component({
  selector: 'app-article-single-not-logged-in',
  templateUrl: './article-single-not-logged-in.component.html',
  styleUrls: ['./article-single-not-logged-in.component.css']
})
export class ArticleSingleNotLoggedInComponent {
  
 @Input() article: Article;
    routParams: any;
    mode: string;

    constructor(
        private route: ActivatedRoute,
        private articlesService: ArticlesService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService) {
        this.article = {
          title: '',
          content: '',
          image: '',
          category: '',
          postedBy: '',
          comments: Array({ postedBy: '', content: '' })
        };
    }

    ngOnInit() {
        
        this.route
            .params
            .subscribe(params => {
                this.routParams = params['title']; 
            });

        this.articlesService.getArticleByTitle(this.routParams)
            .subscribe(articleJson => this.article = articleJson);
    }

    get title(): string {
        return this.article.title;
    }

    get content(): string {
        return this.article.content;
    }

    get image(): string {
        return this.article.image;
    }

    get category():string{
      return this.article.category
    }

    get postedBy():string{
      return this.article.postedBy
    }

    get commentsLength(): number {
      return this.article.comments.length;
    }
}

