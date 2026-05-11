import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './shared/reusable-components/card/card.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { ToasterComponent } from './shared/reusable-component/toaster/toaster.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    HomeComponent,
    CardComponent,
    HeaderComponent,
    LogoutComponent,
    ToasterComponent,
    ProductdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
