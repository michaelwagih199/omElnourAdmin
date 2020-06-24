import { Component, OnInit } from '@angular/core';
import { Patient, VoucherDetail, Project } from 'src/app/services/models/Patient';
import { PatientService } from 'src/app/services/data/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  private routeSub: Subscription;
  patient: Patient = new Patient()
  patientList: Patient[] = [];
  voucherDetailsList: VoucherDetail[] = [];
  index1 = 0;
  index2 = 0;

  patientId: number


  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPatientId()
    console.log(this.patientList)
  }

  /**
  * data
  */
  findPatientById(id: number) {
    this.patientService.getById(id).subscribe(
      response => {
        this.patient = response
        this.patientList.push(response)
        this.voucherDetailsList.push(response.voucherDetails[0])
      },
      error => {
        console.log(error);
      });


  }

  getPatientId() {
    this.routeSub = this.route.params.subscribe(params => {
      this.patientId = params['id']
    });
    this.findPatientById(this.patientId)
  }

  /**
   * events
   */

  back() {
    this.router.navigate([`/patients`])
  }

}
