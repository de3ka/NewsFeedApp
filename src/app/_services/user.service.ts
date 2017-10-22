import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/api/users').map((response: Response) => response.json());
    }

    getByUsername(username) {
        return this.http.get('http://localhost:3000/api/users/' + String(username))
            .map((res: Response) => res.json());
    }

    create(user: User) {
        return this.http.post('http://localhost:3000/api/signup', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
         return this.http.put('http://localhost:3000/api/users/' + user.username, user).map((response: Response) => response.json());
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser')).user;
    }

    deleteUser(username) {
        return this.http.delete('http://localhost:3000/api/users/' + username)
            .map((res: Response) => res.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
