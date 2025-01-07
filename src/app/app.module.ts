import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CompteComponent } from './compte/compte.component';
import { ClientComponent } from './client/client.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { CompteFormComponent } from './compte-form/compte-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CompteComponent,
    ClientComponent,
    ClientFormComponent,
    CompteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
