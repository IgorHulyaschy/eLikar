import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegistrationFormComponent } from './core/components/registration/registration-form/registration-form.component'
import { AuthComponent } from './core/components/auth/auth.component'
import { HomeComponent } from './core/components/home/home.component'
import { AuthGuard } from './core/guards/auth.guard'
import { AboutMeComponent } from './core/components/home/about-me/about-me.component'
import { AdminGuard } from "./core/guards/admin.guard";
import {
  PatientRegistrationComponent
} from "./core/components/registration/patient-registration/patient-registration.component";
import { PatientOverviewComponent } from "./core/components/patient/patient-overview/patient-overview.component";
import { RegisterInQueueComponent } from "./core/components/queue/register-in-queue.component";

const routes: Routes = [
  { path: 'registration-form', component: RegistrationFormComponent, canActivate: [AdminGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about-me', component: AboutMeComponent, canActivate: [AuthGuard] },
  { path: 'register-patient', component: PatientRegistrationComponent, canActivate: [AdminGuard, AuthGuard]},
  { path: 'patient/:id', component: PatientOverviewComponent, canActivate: [AuthGuard] },
  { path: 'register-in-queue', component: RegisterInQueueComponent, canActivate: [AuthGuard, AdminGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
