import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegistrationFormComponent } from './core/components/registration/registration-form/registration-form.component'
import { AuthComponent } from './core/components/auth/auth.component'
import { HomeComponent } from './core/components/home/home.component'
import { AuthGuard } from './core/guards/auth.guard'
import { AboutMeComponent } from './core/components/home/about-me/about-me.component'
import { AdminGuard } from "./core/guards/admin.guard";

const routes: Routes = [
  { path: 'registration-form', component: RegistrationFormComponent, canActivate: [AdminGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about-me', component: AboutMeComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
