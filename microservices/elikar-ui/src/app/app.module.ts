import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { AppComponent } from './app.component'
import { RouterOutlet } from '@angular/router'
import { RegistrationFormComponent } from './core/components/registration/registration-form/registration-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { RoutingModule } from './routing.module'
import { AuthComponent } from './core/components/auth/auth.component'
import { HomeComponent } from './core/components/home/home.component'
import { NavBarComponent } from './core/components/home/nav-bar/nav-bar.component'
import { AboutMeComponent } from './core/components/home/about-me/about-me.component'
import { AuthInterceptor } from './core/interceptor/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    AuthComponent,
    HomeComponent,
    NavBarComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RoutingModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
