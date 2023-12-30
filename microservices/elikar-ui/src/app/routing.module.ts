import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegistrationFormComponent } from './core/components/registration/registration-form/registration-form.component'
import { AuthComponent } from './core/components/auth/auth.component'
import { HomeComponent } from './core/components/home/home.component'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
