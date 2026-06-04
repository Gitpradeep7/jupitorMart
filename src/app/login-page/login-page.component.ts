import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FORM_VALIDATION } from '../shared/reusable-components/card/constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  validations: any =FORM_VALIDATION;
   loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) {}
  private http = inject(HttpClient);
  onLogin() {
  let data = this.loginForm.value;
  this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`).subscribe((res:any)=>{
  console.log('res >>>>>>> ',res);
  if(res.length > 0){
    localStorage.setItem('jupiterCurrentUser',JSON.stringify(res[0]));
    localStorage.setItem('isLoggedIn','true');
    this.router.navigate(['/home']);
  } else {
    alert('not allowed');
  }
 });
  }
}
