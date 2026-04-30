import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';
import { FORM_VALIDATION } from '../shared/reusable-components/card/constant';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  validations: any =FORM_VALIDATION;
   loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private network: NetworkService, private router: Router) {}

  onLogin() {
   let data = localStorage.getItem('jupitorUsers');
   let users = JSON.parse(data!);
   let user = users.find((x:any) => x.username === this.loginForm.get('username')?.value);
   this.network.user(user);
   this.router.navigate(['/home']);
  }
}
