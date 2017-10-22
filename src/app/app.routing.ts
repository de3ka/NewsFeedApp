import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './page-components/login';
import { RegisterComponent } from './page-components/register';
import { CreateArticleComponent } from './page-components/create-article';
import { NotFoundComponent } from './page-components/not-found';
import { NotLoggedInComponent } from './page-components/not-logged-in';
import { ArticleSingleNotLoggedInComponent } from './page-components/article-single-not-logged-in';
import {HomeComponent} from './page-components/home';
import {ArticleSingleLoggedInComponent} from './page-components/article-single-logged-in'
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'createarticle', component: CreateArticleComponent, canActivate: [AuthGuard] },
    { path: 'notfound', component: NotFoundComponent },
    { path: 'notloggedin', component: NotLoggedInComponent },
    { path: 'articles/:title', component: ArticleSingleLoggedInComponent},
    { path: 'article/:title', component: ArticleSingleNotLoggedInComponent},
    { path: 'home', component: HomeComponent },
    // otherwise redirect to home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound' }
];

export const routing = RouterModule.forRoot(appRoutes);
