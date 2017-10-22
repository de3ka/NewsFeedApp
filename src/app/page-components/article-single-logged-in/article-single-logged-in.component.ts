import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, User } from '../../_models';
import { ArticlesService, AlertService, UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-article-single-logged-in',
  templateUrl: './article-single-logged-in.component.html',
  styleUrls: ['./article-single-logged-in.component.css']
})
export class ArticleSingleLoggedInComponent {

  @Input() article: Article;
  currentUser: User = this.userService.getCurrentUser();
   storageUser: User;
    routParams: any;
    mode: string;

    constructor(
        private route: ActivatedRoute,
        private articlesService: ArticlesService,
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService) {
        this.storageUser = new User;
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

    addValues( contentVal:string ) {
       let storageUserUsername = this.userService.getCurrentUser().username;
       
       let comment = {
                        content: contentVal,
                        postedBy: storageUserUsername || "Stranger"
                    };
        this.articlesService.addCommentToArticle(this.article.title, comment)
            .subscribe(
            data => {
                this.alertService.success(`Comment added successful to article`, true);
                this.router.navigate(['/home']);
                this.alertService.clear(3000);
            },
            error => {
                this.alertService.error(error);
            });
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
