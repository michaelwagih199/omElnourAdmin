import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { PatientComponent } from './pages/allPatient/patient.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { VoucherDetailsComponent } from './pages/voucher-details/voucher-details.component';
import { MedicineComponent } from './pages/medicine/medicine.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { ProjectComponent } from './pages/project/project.component';


const routes: Routes = [

  { path: '', component: LoginComponent },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate:[AuthGaurdService]},
  { path: 'pharmacies', component: PharmaciesComponent, canActivate:[AuthGaurdService]},
  { path: 'patients', component: PatientComponent, canActivate:[AuthGaurdService]},
  { path: 'project', component: ProjectComponent, canActivate:[AuthGaurdService]},
  { path: 'patients/newEnrollment', component: PatientComponent, canActivate:[AuthGaurdService]},
  { path: 'doctors', component: DoctorComponent, canActivate:[AuthGaurdService]},
  { path: 'voucher', component: VoucherComponent, canActivate:[AuthGaurdService]},
  { path: 'voucherDetails/:id', component: VoucherDetailsComponent, canActivate:[AuthGaurdService]},
  { path: 'medicine', component: MedicineComponent, canActivate:[AuthGaurdService]},
  { path: 'PatientDetails/:id', component: PatientDetailsComponent, canActivate:[AuthGaurdService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
