import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component'
import { RouterOutlet } from '@angular/router'
import { RegistrationFormComponent } from './core/components/registration/registration-form/registration-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { RoutingModule } from './routing.module'
import { AuthComponent } from './core/components/auth/auth.component'
import { HomeComponent } from './core/components/home/home.component'

@NgModule({
  declarations: [AppComponent, RegistrationFormComponent, AuthComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
