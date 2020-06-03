import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { TempComponent } from './temp/temp.component';
import { GovernorateServiceService } from './services/data/governorate-service.service';
import { BasicAuthHttpInterceptorService } from './services/basic-auth-http-interceptor.service';
import { AuthInterceptor } from './services/AuthInterceptor.service';
import { PharmacyService } from './services/data/pharmacy.service';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { VoucherDetailsComponent } from './pages/voucher-details/voucher-details.component';


registerLocaleData(en);

@NgModule({

  declarations: [

    AppComponent,
    LoginComponent,
    WelcomeComponent,
    MenueComponent,
    PharmaciesComponent,
    ErrorComponent,
    AddPatientComponent,
    PatientComponent,
    TempComponent,
    DoctorComponent,
    VoucherComponent,
    VoucherDetailsComponent,

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

  ],

  providers: [{ provide: NZ_I18N, useValue: en_US }, GovernorateServiceService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    PharmacyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
