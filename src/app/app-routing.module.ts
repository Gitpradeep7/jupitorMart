import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

const routes: Routes = [{path:'', component: RegisterPageComponent}, 
  {path:'login',component : LoginPageComponent},
  {path:'register', redirectTo:'',pathMatch:'full'},
  { path: 'product/:id', component: ProductdetailComponent },
  {path:'home', component: HomeComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
