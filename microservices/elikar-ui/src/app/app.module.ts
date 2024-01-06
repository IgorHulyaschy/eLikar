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
import { PatientRegistrationComponent } from './core/components/registration/patient-registration/patient-registration.component'
import { PopUpComponent } from './shared/components/pop-up.component'
import { PatientOverviewComponent } from "./core/components/patient/patient-overview/patient-overview.component";
import { RegisterInQueueComponent } from "./core/components/queue/register-in-queue.component";
import { QueueViewComponent } from "./core/components/queue/queue-view/queue-view.component";
import { PatientReceptionComponent } from "./core/components/nurse/patient-reception/patient-reception.component";
import {
  MedicalHistoryViewComponent
} from "./core/components/medical-history/medical-history-view/medical-history-view.component";
import {
  NurseHistoryViewComponent
} from "./core/components/medical-history/nurse-history-view/nurse-history-view.component";
import {
  PatientHistoryViewComponent
} from "./core/components/medical-history/patient-history-view/patient-history-view.component";
import {
  SendRegistrationFormComponent
} from "./core/components/registration/registration-form/send-registration-form/send-registration-form.component";
@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    AuthComponent,
    HomeComponent,
    NavBarComponent,
    AboutMeComponent,
    PatientRegistrationComponent,
    PopUpComponent,
    PatientOverviewComponent,
    RegisterInQueueComponent,
    QueueViewComponent,
    PatientReceptionComponent,
    MedicalHistoryViewComponent,
    NurseHistoryViewComponent,
    PatientHistoryViewComponent,
    SendRegistrationFormComponent
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
