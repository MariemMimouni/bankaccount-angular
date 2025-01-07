import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClientComponent } from './client/client.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { CompteComponent } from './compte/compte.component';
import { CompteFormComponent } from './compte-form/compte-form.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { canActivate: [AuthGuardService],path: 'client', component: ClientComponent },
  { canActivate: [AuthGuardService],path: 'compte', component: CompteComponent },
  { canActivate: [AuthGuardService],path: 'compte-form', component: CompteFormComponent },
  { canActivate: [AuthGuardService],path: 'compte-form/:rib', component: CompteFormComponent },
  { canActivate: [AuthGuardService],path: 'ajoutclient', component: ClientFormComponent },
  { canActivate: [AuthGuardService],path: 'client/:id/edit', component: ClientFormComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
