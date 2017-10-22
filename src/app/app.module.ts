import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ng2-bootstrap/carousel';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ArticlesService} from './_services';

import { CreateArticleComponent } from './page-components/create-article';
import { LoginComponent } from './page-components/login';
import { RegisterComponent } from './page-components/register';
import { NotFoundComponent } from './page-components/not-found';
import { NotLoggedInComponent } from './page-components/not-logged-in';
import { ArticleSingleNotLoggedInComponent } from './page-components/article-single-not-logged-in';
import { HomeComponent } from './page-components/home';
import {ArticleSingleLoggedInComponent} from './page-components/article-single-logged-in'

@NgModule({
  declarations: [
    AppComponent,
    CreateArticleComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    NotLoggedInComponent,
    ArticleSingleNotLoggedInComponent,
    HomeComponent,
    ArticleSingleLoggedInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ArticlesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
