import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { PatientComponent } from './pages/allPatient/patient.component';
import { TempComponent } from './temp/temp.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { VoucherDetailsComponent } from './pages/voucher-details/voucher-details.component';


const routes: Routes = [

  { path: '', component: LoginComponent },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate:[AuthGaurdService]},
  { path: 'pharmacies', component: PharmaciesComponent, canActivate:[AuthGaurdService]},
  { path: 'patients', component: PatientComponent, canActivate:[AuthGaurdService]},
  { path: 'doctors', component: DoctorComponent, canActivate:[AuthGaurdService]},
  { path: 'temp', component: TempComponent, canActivate:[AuthGaurdService]},
  { path: 'voucher', component: VoucherComponent, canActivate:[AuthGaurdService]},
  { path: 'voucherDetails', component: VoucherDetailsComponent, canActivate:[AuthGaurdService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
