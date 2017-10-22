import { Component, OnInit, transition, trigger, state, style, animate } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.alertService.success(`User ${this.model.username} logged in successful!`, true);
                this.router.navigate(['/home']);
                this.alertService.clear(3000);
            },
            error => {
                let message = JSON.parse(error._body);
                this.alertService.error(message.err, true);
                this.alertService.clear(3000);
                this.loading = false;
            });
    }
}
