import { Component, trigger, transition, animate, state, style } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService} from '../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

   model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                    this.alertService.clear(3000);
                },
                error => {
                    this.alertService.error(`Username ${this.model.username} already exist`, false);
                    this.loading = false;
                    this.alertService.clear(3000);
                });
    }
}

