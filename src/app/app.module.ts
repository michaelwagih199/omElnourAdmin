import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MenueComponent } from './pages/menu/menue.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { ErrorComponent } from './pages/error/error.component';
import { PatientComponent } from './pages/allPatient/patient.component';
import { GovernorateServiceService } from './services/data/governorate-service.service';
import { AuthInterceptor } from './services/AuthInterceptor.service';
import { PharmacyService } from './services/data/pharmacy.service';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { VoucherDetailsComponent } from './pages/voucher-details/voucher-details.component';
import {DatePipe} from '@angular/common';
import { MedicineComponent } from './pages/medicine/medicine.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { ProjectComponent } from './pages/project/project.component';
import { UsersComponent } from './pages/users/users.component';
import { AboutAppComponent } from './pages/about-app/about-app.component';


@NgModule({

  declarations: [

    AppComponent,
    LoginComponent,
    WelcomeComponent,
    MenueComponent,
    PharmaciesComponent,
    ErrorComponent,
    PatientComponent,
    DoctorComponent,
    VoucherComponent,
    VoucherDetailsComponent,
    MedicineComponent,
    PatientDetailsComponent,
    ProjectComponent,
    UsersComponent,
    AboutAppComponent,

  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzListModule

  ],

  providers: [{ provide: NZ_I18N, useValue: en_US }, GovernorateServiceService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    PharmacyService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
