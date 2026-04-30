import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { FORM_VALIDATION } from '../shared/reusable-components/card/constant';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  //bringing validation messages from another file
  validations: any =FORM_VALIDATION;
  //grouping the form fields with the help of formbuilder (helper class)
  registerForm:FormGroup = this.fb.group({
    employeeId: ['', [Validators.required,Validators.pattern(/^[0-9]{3}/)]],
    name: ['', Validators.required],
    username: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(18)]],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^0?[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)]],
    //passwordGroup for group level validation
    passwordGroup: this.fb.group({
        password:        ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator }),
  });

  constructor(private fb: FormBuilder, private service: NetworkService, private router: Router) {}
  get employeeId()       { return this.registerForm.get('employeeId')!; }
  get name()        { return this.registerForm.get('name')!; }
  get username()       { return this.registerForm.get('username')!; }
  get age()             { return this.registerForm.get('age')!; }
  get gender()           { return this.registerForm.get('gender')!; }
  get address()           { return this.registerForm.get('address')!; }
  get phone()           { return this.registerForm.get('phone')!; }
  get email()           { return this.registerForm.get('email')!; }
  get passwordGroup()   { return this.registerForm.get('passwordGroup')!; }
  get password()        { 
    // to enable and disable confirm password so that we can type when password is filled and valid
    let control = this.registerForm?.get('passwordGroup.password');
    control?.value !== '' && control?.valid ? this.confirmPassword.enable() : this.confirmPassword.disable();
    return this.registerForm.get('passwordGroup.password')!; }

  get confirmPassword() { return this.registerForm.get('passwordGroup.confirmPassword')!; }

  ngOnInit(){
    this.confirmPassword.disable();
  }

  passwordMatchValidator(group: AbstractControl) {
    const password        = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    // Return null = valid, return object = invalid
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
      if(localStorage.getItem('jupitorUsers')) {
        let data = localStorage.getItem('jupitorUsers');
        let users = JSON.parse(data!);
        users.push(this.registerForm.value);
        localStorage.setItem('jupitorUsers',JSON.stringify(users));
        console.log('user 123 ',users);
      } else {
        localStorage.setItem('jupitorUsers',JSON.stringify([this.registerForm.value]));
        console.log('1111 user 1st time ',this.registerForm.value);
      }
      alert('Registration successful! Please login.');
      this.router.navigate(['/login']);
      // this.auth.register(userData);
      // this.router.navigate(['/login']);
  }
  
  getReqError(formControl: string){
    let controls = this.registerForm.controls[formControl];
    return controls.touched && controls.invalid;
  }
}
